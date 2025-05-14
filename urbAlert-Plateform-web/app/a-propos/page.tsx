import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Lightbulb, MapPin, Users, Globe, Shield } from "lucide-react"
import Image from "next/image"

export default function AProposPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">À propos de UrbanAlert Guinée</h1>
          <p className="text-muted-foreground md:text-xl">
            Une plateforme citoyenne pour améliorer les infrastructures urbaines en Guinée
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Notre mission</h2>
            <p className="text-muted-foreground">
              UrbanAlert Guinée est née d&apos;une volonté de résoudre les défis urbains auxquels la Guinée fait face
              quotidiennement. Notre mission est de créer un pont entre les citoyens, les autorités et les entreprises
              pour améliorer la qualité de vie urbaine.
            </p>
            <p className="mt-4 text-muted-foreground">
              Nous croyons au pouvoir de la technologie et de l&apos;action collective pour transformer nos villes et
              villages en espaces plus sûrs, plus propres et mieux entretenus.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=300"
              width={300}
              height={300}
              alt="Notre mission"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comment ça marche?</CardTitle>
            <CardDescription>Un processus simple en trois étapes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium">1. Signaler</h3>
                <p className="text-sm text-muted-foreground">
                  Les citoyens signalent les problèmes urbains qu&apos;ils rencontrent avec photos et localisation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium">2. Visualiser</h3>
                <p className="text-sm text-muted-foreground">
                  Les signalements sont affichés sur une carte interactive accessible à tous.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium">3. Résoudre</h3>
                <p className="text-sm text-muted-foreground">
                  Les autorités et entreprises interviennent pour résoudre les problèmes signalés.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Nos valeurs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  Participation citoyenne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nous croyons au pouvoir des citoyens pour transformer leur environnement urbain à travers
                  l&apos;action collective et la participation active.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-green-600" />
                  Transparence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nous nous engageons à maintenir une plateforme transparente où chaque signalement et chaque action
                  sont visibles par tous.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  Sécurité et confidentialité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  La protection des données personnelles de nos utilisateurs est une priorité absolue pour notre
                  plateforme.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nous cherchons constamment à améliorer notre plateforme et à intégrer de nouvelles technologies pour
                  mieux servir notre communauté.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Notre équipe</h2>
          <p className="text-muted-foreground">
            UrbanAlert Guinée a été développée par une équipe d&apos;étudiants passionnés lors d&apos;un hackathon
            organisé en 2023. Aujourd&apos;hui, notre équipe s&apos;est agrandie et comprend des développeurs, des
            designers, des experts en urbanisme et des spécialistes en communication.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                nom: "Mamadou Diallo",
                role: "Fondateur & CEO",
                photo: "/placeholder.svg?height=100&width=100",
              },
              {
                nom: "Fatoumata Camara",
                role: "Directrice technique",
                photo: "/placeholder.svg?height=100&width=100",
              },
              {
                nom: "Ibrahim Soumah",
                role: "Responsable des partenariats",
                photo: "/placeholder.svg?height=100&width=100",
              },
            ].map((membre, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-3 overflow-hidden rounded-full">
                  <Image src={membre.photo || "/placeholder.svg"} width={100} height={100} alt={membre.nom} />
                </div>
                <h3 className="text-lg font-medium">{membre.nom}</h3>
                <p className="text-sm text-muted-foreground">{membre.role}</p>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nos partenaires</CardTitle>
            <CardDescription>Ils nous font confiance et nous soutiennent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=80&width=120"
                    width={120}
                    height={80}
                    alt={`Partenaire ${i}`}
                    className="opacity-70 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
