import { auth } from '../firebase';
import {
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail,
  ActionCodeSettings
} from 'firebase/auth';

const actionCodeSettings: ActionCodeSettings = {
  url: `${process.env.NEXT_PUBLIC_APP_URL}/connexion`,
  handleCodeInApp: true,
};

export const emailService = {
  sendVerificationEmail: async (user: any) => {
    try {
      await firebaseSendEmailVerification(user, actionCodeSettings);
      console.log('Verification email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  },

  sendPasswordResetEmail: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      console.log('Password reset email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
};
