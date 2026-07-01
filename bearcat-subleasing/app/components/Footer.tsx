import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Bearcat Subleases
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <span className="text-xs text-muted-foreground" aria-hidden>·</span>
            <p className="text-xs text-muted-foreground">
              University of Cincinnati
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
