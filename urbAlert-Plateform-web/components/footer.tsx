import Link from "next/link"
import { MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} UrbanAlert Guinée. Tous droits réservés.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/mentions-legales" className="text-sm text-muted-foreground hover:underline">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="text-sm text-muted-foreground hover:underline">
            Politique de confidentialité
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
