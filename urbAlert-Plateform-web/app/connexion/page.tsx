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
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, signInWithGoogle, resetUserPassword } from "@/lib/api/auth";

export default function ConnexionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Login user with Firebase
      await loginUser(formData.email, formData.motDePasse);
      router.push("/tableau-de-bord");
    } catch (err: any) {
      // Handle Firebase-specific errors
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Email ou mot de passe incorrect");
      } else if (err.code === "auth/invalid-email") {
        setError("Adresse email invalide");
      } else if (err.code === "auth/user-disabled") {
        setError("Ce compte utilisateur a été désactivé");
      } else {
        setError("Erreur de connexion: " + (err.message || "Erreur inconnue"));
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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail) {
      setError("Veuillez entrer votre adresse email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await resetUserPassword(resetEmail);
      setResetEmailSent(true);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Aucun compte ne correspond à cette adresse email");
      } else if (err.code === "auth/invalid-email") {
        setError("Adresse email invalide");
      } else {
        setError(
          "Erreur lors de l'envoi du mail de réinitialisation: " +
            (err.message || "Erreur inconnue")
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-10 md:py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre compte et gérer vos signalements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resetEmailSent ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <h3 className="text-xl font-semibold">Email envoyé!</h3>
              <p className="text-center text-muted-foreground">
                Un lien de réinitialisation a été envoyé à {resetEmail}.
                Veuillez vérifier votre boite de réception et suivre les
                instructions.
              </p>
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  setResetEmailSent(false);
                  setResetEmail("");
                }}
              >
                Retour à la connexion
              </Button>
            </div>
          ) : formData.email && formData.email === resetEmail ? (
            <form onSubmit={handlePasswordReset} className="space-y-4 py-6">
              <h3 className="text-xl font-semibold">
                Réinitialisation de mot de passe
              </h3>
              <p className="text-muted-foreground">
                Entrez votre adresse email pour recevoir un lien de
                réinitialisation de mot de passe.
              </p>
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email</Label>
                <Input
                  id="resetEmail"
                  name="resetEmail"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={resetEmail}
                  onChange={handleResetEmailChange}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setResetEmail("")}
                >
                  Annuler
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en
                      cours...
                    </>
                  ) : (
                    "Envoyer le lien"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="oauth">Google / Facebook</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="motDePasse">Mot de passe</Label>
                      <button
                        type="button"
                        onClick={() => setResetEmail(formData.email)}
                        className="text-xs text-primary hover:underline"
                      >
                        Mot de passe oublié?
                      </button>
                    </div>
                    <Input
                      id="motDePasse"
                      name="motDePasse"
                      type="password"
                      required
                      value={formData.motDePasse}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Connexion en cours...
                      </>
                    ) : (
                      "Se connecter"
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
            Vous n&apos;avez pas de compte?{" "}
            <Link href="/inscription" className="text-primary hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
