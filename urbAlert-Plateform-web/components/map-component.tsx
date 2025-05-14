"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Définir les types pour les filtres
interface MapComponentProps {
  activeFilters: {
    routes: boolean
    electricite: boolean
    dechets: boolean
  }
}

// Données de test pour les signalements
const mockSignalements = [
  {
    id: 1,
    type: "route",
    titre: "Route endommagée",
    description: "Nid de poule important sur la route principale",
    lat: 9.641185,
    lng: -13.578401,
    date: "2023-05-12",
    auteur: "Ahmed D.",
  },
  {
    id: 2,
    type: "electricite",
    titre: "Panne électrique",
    description: "Coupure d'électricité dans tout le quartier",
    lat: 9.535768,
    lng: -13.68199,
    date: "2023-05-13",
    auteur: "Marie K.",
  },
  {
    id: 3,
    type: "dechets",
    titre: "Dépôt de déchets",
    description: "Accumulation de déchets non collectés près du marché",
    lat: 9.509768,
    lng: -13.712125,
    date: "2023-05-11",
    auteur: "Ibrahim S.",
  },
  {
    id: 4,
    type: "route",
    titre: "Effondrement de chaussée",
    description: "La route s'est effondrée après les fortes pluies",
    lat: 9.55,
    lng: -13.65,
    date: "2023-05-10",
    auteur: "Fatou B.",
  },
  {
    id: 5,
    type: "electricite",
    titre: "Câble électrique tombé",
    description: "Câble électrique dangereux sur la voie publique",
    lat: 9.58,
    lng: -13.63,
    date: "2023-05-14",
    auteur: "Paul M.",
  },
]

export default function MapComponent({ activeFilters }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    // Initialiser la carte si elle n'existe pas déjà
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([9.55, -13.7], 12)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      markersLayerRef.current = L.layerGroup().addTo(mapRef.current)
    }

    // Fonction pour créer une icône personnalisée
    const createCustomIcon = (type: string) => {
      const iconHtml = (() => {
        switch (type) {
          case "route":
            return `<div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    </div>`
          case "electricite":
            return `<div class="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                    </div>`
          case "dechets":
            return `<div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </div>`
          default:
            return `<div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>`
        }
      })()

      return L.divIcon({
        html: iconHtml,
        className: "custom-div-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })
    }

    // Mettre à jour les marqueurs en fonction des filtres
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers()

      mockSignalements.forEach((signalement) => {
        if (
          (signalement.type === "route" && activeFilters.routes) ||
          (signalement.type === "electricite" && activeFilters.electricite) ||
          (signalement.type === "dechets" && activeFilters.dechets)
        ) {
          const marker = L.marker([signalement.lat, signalement.lng], {
            icon: createCustomIcon(signalement.type),
          }).addTo(markersLayerRef.current!)

          marker.bindPopup(`
            <div>
              <h3 class="font-bold">${signalement.titre}</h3>
              <p>${signalement.description}</p>
              <div class="mt-2 text-xs text-gray-500">
                Signalé par: ${signalement.auteur} le ${signalement.date}
              </div>
              <button class="mt-2 rounded bg-green-600 px-2 py-1 text-xs text-white">Voir détails</button>
            </div>
          `)
        }
      })
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (mapRef.current && !document.getElementById("map")) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [activeFilters])

  return <div id="map" className="h-full w-full" />
}
