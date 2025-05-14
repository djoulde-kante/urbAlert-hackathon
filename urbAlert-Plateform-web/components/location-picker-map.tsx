"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface LocationPickerMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void
}

export default function LocationPickerMap({ onLocationSelect }: LocationPickerMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Initialiser la carte si elle n'existe pas déjà
    if (!mapRef.current) {
      // Coordonnées centrées sur Conakry, Guinée
      mapRef.current = L.map("location-picker-map").setView([9.55, -13.7], 12)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      // Créer une icône personnalisée pour le marqueur
      const customIcon = L.divIcon({
        html: `<div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>`,
        className: "custom-div-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })

      // Ajouter un gestionnaire d'événements de clic sur la carte
      mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng

        // Supprimer le marqueur existant s'il y en a un
        if (markerRef.current) {
          markerRef.current.remove()
        }

        // Ajouter un nouveau marqueur à l'emplacement cliqué
        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current!)

        // Mettre à jour l'état et appeler la fonction de rappel
        const location = { lat, lng }
        setSelectedLocation(location)
        onLocationSelect(location)
      })
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (mapRef.current && !document.getElementById("location-picker-map")) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onLocationSelect])

  return <div id="location-picker-map" className="h-full w-full" />
}
