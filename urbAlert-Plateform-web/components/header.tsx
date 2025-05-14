"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  MapPin,
  LogIn,
  LogOut,
  User,
  Bell,
  Settings,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, userData, logout } = useAuth();

  const routes = [
    {
      href: "/",
      label: "Accueil",
      active: pathname === "/",
    },
    {
      href: "/carte",
      label: "Carte",
      active: pathname === "/carte",
    },
    {
      href: "/signaler",
      label: "Signaler",
      active: pathname === "/signaler",
    },
    {
      href: "/a-propos",
      label: "À propos",
      active: pathname === "/a-propos",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // No need to redirect, AuthProvider will handle auth state
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="grid gap-6 text-lg font-medium">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-2 ${
                      route.active ? "text-foreground" : "text-muted-foreground"
                    } hover:text-foreground`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/tableau-de-bord"
                    className={`flex items-center gap-2 ${
                      pathname === "/tableau-de-bord"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    } hover:text-foreground`}
                    onClick={() => setIsOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                )}
                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl hidden sm:inline-block">
              UrbAlert Guinée
            </span>
            <span className="font-bold text-xl sm:hidden">UA</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium ${
                route.active ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              {route.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/tableau-de-bord"
              className={`text-sm font-medium ${
                pathname === "/tableau-de-bord"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Tableau de bord
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />

          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userData?.photoURL || undefined}
                        alt={userData?.displayName || "User"}
                      />
                      <AvatarFallback>
                        {getInitials(userData?.displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {userData?.displayName || "Utilisateur"}
                    <p className="text-xs text-muted-foreground">
                      {userData?.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profil">
                      <User className="mr-2 h-4 w-4" />
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/parametres">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/connexion">
                <Button variant="ghost" size="icon">
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Se connecter</span>
                </Button>
              </Link>
              <Link href="/inscription" className="hidden sm:block">
                <Button className="bg-green-600 hover:bg-green-700">
                  S&apos;inscrire
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
