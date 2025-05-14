"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Lightbulb, Trash2, MapPin, Clock, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function TableauDeBordPage() {
  const [activeTab, setActiveTab] = useState("apercu")

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Suivez vos signalements et consultez les statistiques de la plateforme
          </p>
        </div>
        <Link href="/signaler">
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <AlertTriangle className="h-4 w-4" />
            Nouveau signalement
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="apercu">Aperçu</TabsTrigger>
          <TabsTrigger value="mes-signalements">Mes signalements</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="apercu" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des signalements</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+14% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Signalements résolus</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64</div>
                <p className="text-xs text-muted-foreground">+7% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">-2% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mes signalements</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 résolus, 2 en attente</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Derniers signalements sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "route",
                      titre: "Route endommagée",
                      lieu: "Conakry, Kaloum",
                      date: "Il y a 2 heures",
                      statut: "en attente",
                    },
                    {
                      type: "electricite",
                      titre: "Panne électrique",
                      lieu: "Conakry, Ratoma",
                      date: "Il y a 5 heures",
                      statut: "en cours",
                    },
                    {
                      type: "dechets",
                      titre: "Dépôt de déchets",
                      lieu: "Conakry, Matam",
                      date: "Il y a 1 jour",
                      statut: "résolu",
                    },
                    {
                      type: "route",
                      titre: "Effondrement de chaussée",
                      lieu: "Conakry, Dixinn",
                      date: "Il y a 2 jours",
                      statut: "en cours",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4">
                        {item.type === "route" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        {item.type === "electricite" && <Lightbulb className="h-5 w-5 text-yellow-500" />}
                        {item.type === "dechets" && <Trash2 className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.titre}</p>
                        <p className="text-xs text-muted-foreground">{item.lieu}</p>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        <Badge
                          variant={
                            item.statut === "résolu" ? "outline" : item.statut === "en cours" ? "secondary" : "default"
                          }
                          className="mb-1"
                        >
                          {item.statut}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Répartition des problèmes</CardTitle>
                <CardDescription>Types de problèmes signalés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                        <span>Routes endommagées</span>
                      </div>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>Pannes électriques</span>
                      </div>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Trash2 className="mr-2 h-4 w-4 text-green-500" />
                        <span>Dépôts de déchets</span>
                      </div>
                      <span className="font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mes-signalements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mes signalements</CardTitle>
              <CardDescription>Historique de tous vos signalements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "SIG-001",
                    type: "route",
                    titre: "Nid de poule dangereux",
                    lieu: "Avenue de la République, Kaloum",
                    date: "12/05/2023",
                    statut: "résolu",
                    votes: 15,
                  },
                  {
                    id: "SIG-002",
                    type: "electricite",
                    titre: "Coupure d'électricité",
                    lieu: "Quartier Nongo, Ratoma",
                    date: "23/04/2023",
                    statut: "résolu",
                    votes: 8,
                  },
                  {
                    id: "SIG-003",
                    type: "dechets",
                    titre: "Déchets non collectés",
                    lieu: "Marché Madina, Matam",
                    date: "05/05/2023",
                    statut: "en cours",
                    votes: 12,
                  },
                  {
                    id: "SIG-004",
                    type: "route",
                    titre: "Effondrement partiel de la route",
                    lieu: "Rue KA-015, Dixinn",
                    date: "10/05/2023",
                    statut: "en attente",
                    votes: 5,
                  },
                  {
                    id: "SIG-005",
                    type: "electricite",
                    titre: "Câble électrique tombé",
                    lieu: "Quartier Kipé, Ratoma",
                    date: "15/05/2023",
                    statut: "en attente",
                    votes: 7,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        {item.type === "route" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        {item.type === "electricite" && <Lightbulb className="h-5 w-5 text-yellow-500" />}
                        {item.type === "dechets" && <Trash2 className="h-5 w-5 text-green-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.titre}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {item.lieu}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-between sm:justify-end sm:space-x-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {item.id}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <Badge
                        variant={
                          item.statut === "résolu" ? "outline" : item.statut === "en cours" ? "secondary" : "default"
                        }
                      >
                        {item.statut}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistiques" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Statistiques globales</CardTitle>
                <CardDescription>Aperçu des données de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total des signalements</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Signalements résolus</span>
                    <span className="font-medium">64 (50%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temps moyen de résolution</span>
                    <span className="font-medium">7 jours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Utilisateurs actifs</span>
                    <span className="font-medium">342</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Zones les plus signalées</CardTitle>
                <CardDescription>Quartiers avec le plus de problèmes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Kaloum</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Ratoma</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Matam</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Dixinn</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Évolution mensuelle</CardTitle>
                <CardDescription>Nombre de signalements par mois</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="flex h-[200px] w-full items-end justify-between gap-2">
                  {[15, 25, 32, 45, 28, 35].map((value, index) => (
                    <div key={index} className="relative flex w-full flex-col items-center">
                      <div
                        className="w-full rounded-sm bg-green-600"
                        style={{ height: `${(value / 45) * 100}%` }}
                      ></div>
                      <span className="mt-2 text-xs">{["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"][index]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analyse des tendances</CardTitle>
              <CardDescription>Évolution des types de problèmes au fil du temps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex h-full items-end gap-4">
                    <div className="flex h-full w-full flex-col justify-end space-y-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-xs">Routes</span>
                        </div>
                        <div className="h-32 w-full rounded-sm bg-red-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span className="text-xs">Électricité</span>
                        </div>
                        <div className="h-24 w-full rounded-sm bg-yellow-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-xs">Déchets</span>
                        </div>
                        <div className="h-20 w-full rounded-sm bg-green-500 bg-opacity-70"></div>
                      </div>
                      <div className="text-center text-xs">Janvier</div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-2">
                      <div className="space-y-2">
                        <div className="h-36 w-full rounded-sm bg-red-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-28 w-full rounded-sm bg-yellow-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-24 w-full rounded-sm bg-green-500 bg-opacity-70"></div>
                      </div>
                      <div className="text-center text-xs">Février</div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-2">
                      <div className="space-y-2">
                        <div className="h-40 w-full rounded-sm bg-red-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-32 w-full rounded-sm bg-yellow-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-28 w-full rounded-sm bg-green-500 bg-opacity-70"></div>
                      </div>
                      <div className="text-center text-xs">Mars</div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-2">
                      <div className="space-y-2">
                        <div className="h-44 w-full rounded-sm bg-red-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-36 w-full rounded-sm bg-yellow-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-32 w-full rounded-sm bg-green-500 bg-opacity-70"></div>
                      </div>
                      <div className="text-center text-xs">Avril</div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-2">
                      <div className="space-y-2">
                        <div className="h-40 w-full rounded-sm bg-red-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-32 w-full rounded-sm bg-yellow-500 bg-opacity-70"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-36 w-full rounded-sm bg-green-500 bg-opacity-70"></div>
                      </div>
                      <div className="text-center text-xs">Mai</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
