"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Lightbulb, Trash2, Navigation, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import dynamic from "next/dynamic"

// Importation dynamique de la carte pour éviter les erreurs de rendu côté serveur
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center bg-muted">
      <p>Chargement de la carte...</p>
    </div>
  ),
})

export default function CartePage() {
  const [activeFilters, setActiveFilters] = useState({
    routes: true,
    electricite: true,
    dechets: true,
  })

  const handleFilterChange = (filter: keyof typeof activeFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Carte des signalements</h1>
          <p className="text-muted-foreground">
            Visualisez et naviguez à travers les problèmes urbains signalés en Guinée
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtrer les signalements</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="routes"
                      checked={activeFilters.routes}
                      onCheckedChange={() => handleFilterChange("routes")}
                    />
                    <Label htmlFor="routes" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Routes endommagées
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="electricite"
                      checked={activeFilters.electricite}
                      onCheckedChange={() => handleFilterChange("electricite")}
                    />
                    <Label htmlFor="electricite" className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Pannes électriques
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dechets"
                      checked={activeFilters.dechets}
                      onCheckedChange={() => handleFilterChange("dechets")}
                    />
                    <Label htmlFor="dechets" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4 text-green-500" />
                      Dépôts de déchets
                    </Label>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Navigation className="h-4 w-4" />
            Itinéraire
          </Button>
        </div>
      </div>

      <Tabs defaultValue="carte" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="carte">Carte</TabsTrigger>
          <TabsTrigger value="liste">Liste des signalements</TabsTrigger>
        </TabsList>
        <TabsContent value="carte" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <MapComponent activeFilters={activeFilters} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="liste" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Exemple de signalements */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-lg">Route endommagée</CardTitle>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 2 jours</span>
                </div>
                <CardDescription>Conakry, Kaloum</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm">
                  Nid de poule important sur la route principale, dangereux pour les véhicules.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Signalé par: Ahmed D.</span>
                  <Button variant="outline" size="sm" className="h-8">
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-lg">Panne électrique</CardTitle>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 1 jour</span>
                </div>
                <CardDescription>Conakry, Ratoma</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm">Coupure d&apos;électricité dans tout le quartier depuis hier soir.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Signalé par: Marie K.</span>
                  <Button variant="outline" size="sm" className="h-8">
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-lg">Dépôt de déchets</CardTitle>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 3 jours</span>
                </div>
                <CardDescription>Conakry, Matam</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm">Accumulation de déchets non collectés près du marché central.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Signalé par: Ibrahim S.</span>
                  <Button variant="outline" size="sm" className="h-8">
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
