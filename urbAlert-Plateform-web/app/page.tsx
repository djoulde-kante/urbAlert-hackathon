import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, AlertTriangle, Lightbulb, Navigation } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-600 to-green-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Améliorons ensemble les infrastructures de la Guinée
                </h1>
                <p className="max-w-[600px] text-white md:text-xl">
                  Signalez les problèmes urbains, consultez l&apos;état des infrastructures et contribuez à
                  l&apos;amélioration de votre environnement.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signaler">
                  <Button size="lg" className="bg-white text-green-800 hover:bg-gray-100">
                    Signaler un problème
                  </Button>
                </Link>
                <Link href="/carte">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    Explorer la carte
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="Illustration de la plateforme"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Fonctionnalités principales</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Notre plateforme offre des outils puissants pour améliorer la vie urbaine en Guinée
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Signalement des problèmes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Signalez facilement les routes endommagées, pannes électriques et dépôts de déchets avec photos et
                    localisation GPS.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-blue-500" />
                    Navigation intelligente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Planifiez vos trajets en évitant les zones problématiques grâce à notre système de navigation en
                    temps réel.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-500" />
                    Cartographie interactive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Visualisez sur une carte interactive l&apos;ensemble des signalements et l&apos;état des
                    infrastructures.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Tableau de bord pour les autorités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Espace dédié aux municipalités et gestionnaires urbains pour suivre les signalements et coordonner
                    les interventions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comment ça marche</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Un processus simple en quelques étapes pour améliorer votre environnement urbain
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Créez un compte</h3>
              <p className="text-muted-foreground">
                Inscrivez-vous en quelques clics et rejoignez notre communauté d&apos;utilisateurs engagés.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">Signalez un problème</h3>
              <p className="text-muted-foreground">
                Prenez une photo, ajoutez une description et localisez le problème sur la carte.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Suivez les interventions</h3>
              <p className="text-muted-foreground">
                Recevez des notifications sur l&apos;avancement des interventions et l&apos;amélioration de votre
                environnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Rejoignez-nous aujourd&apos;hui</h2>
              <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ensemble, nous pouvons améliorer les infrastructures urbaines de la Guinée
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/inscription">
                <Button size="lg" className="bg-white text-green-800 hover:bg-gray-100">
                  Créer un compte
                </Button>
              </Link>
              <Link href="/connexion">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
