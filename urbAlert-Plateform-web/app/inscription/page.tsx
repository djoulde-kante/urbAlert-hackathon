"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithGoogle, registerUser } from "@/lib/api/auth";

export default function InscriptionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    confirmMotDePasse: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (formData.motDePasse.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setIsLoading(false);
      return;
    }

    try {
      // Register user with Firebase
      await registerUser(formData.email, formData.motDePasse, formData.nom);
      setSuccess(true);
    } catch (err: any) {
      // Handle Firebase-specific errors
      if (err.code === "auth/email-already-in-use") {
        setError("Cette adresse email est déjà utilisée");
      } else if (err.code === "auth/invalid-email") {
        setError("Adresse email invalide");
      } else if (err.code === "auth/weak-password") {
        setError("Le mot de passe est trop faible");
      } else {
        setError(
          "Une erreur est survenue lors de l'inscription: " +
            (err.message || "Erreur inconnue")
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      router.push("/tableau-de-bord");
    } catch (err: any) {
      setError(
        "Erreur de connexion avec Google: " + (err.message || "Erreur inconnue")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-10 md:py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Rejoignez notre communauté pour signaler et consulter les problèmes
            urbains en Guinée
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Inscription réussie!</h3>
              <p className="text-center text-muted-foreground">
                Un email de confirmation a été envoyé à votre adresse. Veuillez
                cliquer sur le lien pour activer votre compte.
              </p>
              <Button asChild className="mt-2 w-full">
                <Link href="/connexion">Aller à la page de connexion</Link>
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="oauth">Google / Facebook</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet</Label>
                    <Input
                      id="nom"
                      name="nom"
                      placeholder="Entrez votre nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone (optionnel)</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="+224 XX XX XX XX"
                      value={formData.telephone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motDePasse">Mot de passe</Label>
                    <Input
                      id="motDePasse"
                      name="motDePasse"
                      type="password"
                      required
                      value={formData.motDePasse}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmMotDePasse">
                      Confirmer le mot de passe
                    </Label>
                    <Input
                      id="confirmMotDePasse"
                      name="confirmMotDePasse"
                      type="password"
                      required
                      value={formData.confirmMotDePasse}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Inscription en cours...
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="oauth">
                <div className="flex flex-col space-y-4 pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Connexion en cours...
                      </>
                    ) : (
                      "Continuer avec Google"
                    )}
                  </Button>
                  <Button variant="outline" className="w-full" disabled={true}>
                    Continuer avec Facebook
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Vous avez déjà un compte?{" "}
            <Link href="/connexion" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
