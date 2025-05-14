"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/context/auth-context";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.emailVerified) {
      router.push("/tableau-de-bord");
    }
  }, [user, router]);

  const handleResendVerification = async () => {
    try {
      if (user) {
        await sendEmailVerification(user, {
          url: `${window.location.origin}/connexion?email=${user.email}`,
          handleCodeInApp: true,
        });
        setVerificationSent(true);
        setError("");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!user) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Vérification requise</CardTitle>
            <CardDescription>
              Vous devez être connecté pour vérifier votre email.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button onClick={() => router.push("/connexion")}>
              Aller à la page de connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Vérification de l&apos;email</CardTitle>
          <CardDescription>
            Un email de vérification a été envoyé à {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {verificationSent && (
            <Alert className="bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Un nouvel email de vérification a été envoyé.
              </AlertDescription>
            </Alert>
          )}

          <p className="text-center text-sm text-gray-600">
            Veuillez vérifier votre boîte de réception et cliquer sur le lien de
            vérification.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <Button
              variant="outline"
              onClick={handleResendVerification}
              disabled={verificationSent}
            >
              {verificationSent ? "Email envoyé" : "Renvoyer l'email"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/connexion")}
            >
              Retour à la connexion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
