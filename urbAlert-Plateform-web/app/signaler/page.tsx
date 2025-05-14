"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle, Lightbulb, Trash2, Upload, Check, Loader2, MapPin } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import dynamic from "next/dynamic"

// Importation dynamique de la carte pour éviter les erreurs de rendu côté serveur
const LocationPickerMap = dynamic(() => import("@/components/location-picker-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center bg-muted">
      <p>Chargement de la carte...</p>
    </div>
  ),
})

export default function SignalerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [formData, setFormData] = useState({
    type: "route",
    titre: "",
    description: "",
    photo: null as File | null,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, photo: file }))

    // Créer une URL pour la prévisualisation
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.titre || !formData.description) {
      setError("Veuillez remplir tous les champs obligatoires")
      setIsLoading(false)
      return
    }

    if (!selectedLocation) {
      setError("Veuillez sélectionner un emplacement sur la carte")
      setIsLoading(false)
      return
    }

    // Simulation d'une requête API
    try {
      // Ici, vous implémenteriez l'appel à votre API pour enregistrer le signalement
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi du signalement")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Signaler un problème</h1>

        <Card>
          <CardHeader>
            <CardTitle>Nouveau signalement</CardTitle>
            <CardDescription>
              Aidez à améliorer les infrastructures en signalant les problèmes que vous rencontrez
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Signalement envoyé avec succès!</h3>
                <p className="text-center text-muted-foreground">
                  Merci pour votre contribution. Votre signalement a été enregistré et sera traité par les autorités
                  compétentes.
                </p>
                <Button
                  onClick={() => {
                    setSuccess(false)
                    setFormData({
                      type: "route",
                      titre: "",
                      description: "",
                      photo: null,
                    })
                    setPreviewUrl(null)
                    setSelectedLocation(null)
                  }}
                  className="mt-2"
                >
                  Faire un nouveau signalement
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Type de problème</Label>
                  <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="route" id="route" className="peer sr-only" />
                      <Label
                        htmlFor="route"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <AlertTriangle className="mb-3 h-6 w-6 text-red-500" />
                        Route
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="electricite" id="electricite" className="peer sr-only" />
                      <Label
                        htmlFor="electricite"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Lightbulb className="mb-3 h-6 w-6 text-yellow-500" />
                        Électricité
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dechets" id="dechets" className="peer sr-only" />
                      <Label
                        htmlFor="dechets"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Trash2 className="mb-3 h-6 w-6 text-green-500" />
                        Déchets
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titre">Titre du signalement</Label>
                  <Input
                    id="titre"
                    name="titre"
                    placeholder="Ex: Nid de poule dangereux"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Décrivez le problème en détail..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Localisation</Label>
                  <div className="h-[300px] w-full overflow-hidden rounded-md border">
                    <LocationPickerMap onLocationSelect={handleLocationSelect} />
                  </div>
                  {selectedLocation && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      Position sélectionnée: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo (optionnel)</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="photo"
                        className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/25 px-4 py-2 text-center hover:bg-accent hover:text-accent-foreground"
                      >
                        <Upload className="mb-2 h-6 w-6" />
                        <span className="text-sm font-medium">Cliquez pour ajouter une photo</span>
                        <span className="text-xs text-muted-foreground">JPG, PNG ou GIF jusqu&apos;à 5MB</span>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </Label>
                    </div>
                    {previewUrl && (
                      <div className="relative h-32 w-full overflow-hidden rounded-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Aperçu"
                          className="h-full w-full object-cover"
                          onLoad={() => URL.revokeObjectURL(previewUrl)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          {!success && (
            <CardFooter>
              <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...
                  </>
                ) : (
                  "Envoyer le signalement"
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
