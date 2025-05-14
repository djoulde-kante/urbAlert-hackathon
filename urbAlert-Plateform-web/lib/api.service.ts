import { auth, db, storage } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  startAfter,
  GeoPoint,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

export interface Report {
  id?: string;
  type: 'road' | 'electricity' | 'waste' | 'other';
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  photoUrl?: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  userId: string;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
}

class ApiService {
  // Reports
  static async createReport(reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'votes'>, photo?: File) {
    try {
      let photoUrl;
      
      if (photo) {
        const storageRef = ref(storage, `reports/${Date.now()}_${photo.name}`);
        await uploadBytes(storageRef, photo);
        photoUrl = await getDownloadURL(storageRef);
      }

      const reportRef = await addDoc(collection(db, 'reports'), {
        ...reportData,
        photoUrl,
        votes: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const reportSnap = await getDoc(reportRef);
      return { id: reportRef.id, ...reportSnap.data() } as Report;
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  }

  static async getReports(filters?: {
    type?: string;
    status?: string;
    userId?: string;
    page?: number;
    limit?: number;
  }) {
    try {
      let q = collection(db, 'reports');
      const constraints: any[] = [];

      if (filters?.type) {
        constraints.push(where('type', '==', filters.type));
      }

      if (filters?.status) {
        constraints.push(where('status', '==', filters.status));
      }

      if (filters?.userId) {
        constraints.push(where('userId', '==', filters.userId));
      }

      constraints.push(orderBy('createdAt', 'desc'));

      if (filters?.limit) {
        constraints.push(limit(filters.limit));
      }

      const querySnapshot = await getDocs(query(q, ...constraints));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Report[];
    } catch (error) {
      console.error('Error getting reports:', error);
      throw error;
    }
  }

  static async getNearbyReports(latitude: number, longitude: number, radiusInKm: number = 5) {
    try {
      const center = new GeoPoint(latitude, longitude);
      const bounds = this.getBoundingBox(latitude, longitude, radiusInKm);

      const querySnapshot = await getDocs(
        query(
          collection(db, 'reports'),
          where('location.latitude', '>=', bounds.south),
          where('location.latitude', '<=', bounds.north)
        )
      );

      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(report => {
          const distance = this.calculateDistance(
            latitude,
            longitude,
            report.location.latitude,
            report.location.longitude
          );
          return distance <= radiusInKm;
        }) as Report[];
    } catch (error) {
      console.error('Error getting nearby reports:', error);
      throw error;
    }
  }

  static async updateReport(reportId: string, updateData: Partial<Report>) {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });

      const reportSnap = await getDoc(reportRef);
      return { id: reportRef.id, ...reportSnap.data() } as Report;
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  }

  static async deleteReport(reportId: string) {
    try {
      const reportRef = doc(db, 'reports', reportId);
      const reportSnap = await getDoc(reportRef);
      const report = reportSnap.data() as Report;

      // Delete photo from storage if exists
      if (report.photoUrl) {
        const photoRef = ref(storage, report.photoUrl);
        await deleteObject(photoRef);
      }

      await deleteDoc(reportRef);
    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    }
  }

  static async voteReport(reportId: string, userId: string, voteType: 'up' | 'down') {
    try {
      const reportRef = doc(db, 'reports', reportId);
      const voteRef = doc(db, 'votes', `${reportId}_${userId}`);

      const voteSnap = await getDoc(voteRef);
      const reportSnap = await getDoc(reportRef);

      if (!reportSnap.exists()) {
        throw new Error('Report not found');
      }

      const report = reportSnap.data() as Report;

      if (voteSnap.exists()) {
        const existingVote = voteSnap.data();
        if (existingVote.type === voteType) {
          return report;
        }

        await updateDoc(reportRef, {
          votes: report.votes + (voteType === 'up' ? 2 : -2)
        });
      } else {
        await updateDoc(reportRef, {
          votes: report.votes + (voteType === 'up' ? 1 : -1)
        });
      }

      await updateDoc(voteRef, {
        userId,
        reportId,
        type: voteType,
        createdAt: serverTimestamp()
      });

      const updatedReportSnap = await getDoc(reportRef);
      return { id: reportId, ...updatedReportSnap.data() } as Report;
    } catch (error) {
      console.error('Error voting for report:', error);
      throw error;
    }
  }

  // Utility functions
  private static getBoundingBox(latitude: number, longitude: number, radiusInKm: number) {
    const R = 6371; // Earth's radius in km
    const lat = latitude * (Math.PI / 180);
    const lon = longitude * (Math.PI / 180);
    const d = radiusInKm / R;

    const latMin = lat - d;
    const latMax = lat + d;
    const lonMin = lon - d / Math.cos(lat);
    const lonMax = lon + d / Math.cos(lat);

    return {
      north: latMax * (180 / Math.PI),
      south: latMin * (180 / Math.PI),
      east: lonMax * (180 / Math.PI),
      west: lonMin * (180 / Math.PI),
    };
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
}

export default ApiService;