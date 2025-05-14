"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin, LogIn } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
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
        </div>
      </div>
    </header>
  );
}
