import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarRange,
  CircleCheckBig,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse verified Cincinnati student subleases with a trust-first marketplace built for near-campus housing.",
};

const heroSignals = [
  "Verified UC student",
  "Near campus",
  "Private bath options",
  "Multiple listing photos",
];

const trustCallouts = [
  {
    icon: ShieldCheck,
    label: "Verified UC student",
    position:
      "left-2 top-12 sm:-left-10 sm:top-16 lg:-left-16",
  },
  {
    icon: CalendarRange,
    label: "Available Aug-Dec",
    position:
      "right-3 top-7 sm:-right-8 sm:top-10 lg:-right-12",
  },
  {
    icon: BedDouble,
    label: "Furnished",
    position:
      "left-6 bottom-24 sm:-left-4 sm:bottom-20 lg:-left-12",
  },
  {
    icon: MapPin,
    label: "Walkable to UC",
    position:
      "right-4 bottom-8 sm:-right-10 sm:bottom-6 lg:-right-14",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex min-h-[calc(100vh-2.5rem)] flex-col p-5 sm:p-8 lg:p-10">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/55" />
                </span>
              </span>
              <span className="text-xl font-semibold">Bearcat Subleasing</span>
            </Link>

            <nav className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-5">
                <a href="#how-it-works" className="transition hover:text-foreground">
                  How it works
                </a>
                <a href="#why-bearcat" className="transition hover:text-foreground">
                  Why Bearcat
                </a>
                <Link href="/listings/create" className="transition hover:text-foreground">
                  Post a listing
                </Link>
              </div>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[#b8011c]"
              >
                Browse listings
              </Link>
            </nav>
          </header>

          <section className="grid flex-1 items-center gap-14 pb-6 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:gap-10 lg:pt-16">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/12 bg-primary/6 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Trust-first housing built for Cincinnati students
              </div>

              <h1 className="font-heading max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
                Find a Cincinnati sublease that feels verified before you even click.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Browse student-submitted listings with clearer availability, stronger photo confidence,
                and a marketplace tone that feels local, polished, and actually useful.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-[#b8011c]"
                >
                  Go to listing dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/listings/create"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/25 hover:text-primary"
                >
                  Post your sublease
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {heroSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground shadow-card"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[34rem]">
              {trustCallouts.map(({ icon: Icon, label, position }) => (
                <div
                  key={label}
                  className={`absolute z-20 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/92 px-3 py-2 text-xs font-semibold text-foreground shadow-card backdrop-blur sm:flex ${position}`}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </div>
              ))}

              <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.98)_0%,rgba(255,250,246,0.94)_52%,rgba(234,219,193,0.66)_100%)] p-5 shadow-soft sm:p-6">
                <div className="absolute inset-x-8 top-4 h-24 rounded-full bg-primary/7 blur-3xl" />

                <div className="relative grid gap-4">
                  <div className="flex items-center justify-between rounded-[1.5rem] border border-border/70 bg-white/85 px-4 py-3 shadow-card">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Listing dashboard
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fresh student listings, organized to scan fast.
                      </p>
                    </div>
                    <CircleCheckBig className="h-8 w-8 text-[color:var(--verified)]" />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.25fr_0.85fr]">
                    <article className="overflow-hidden rounded-[1.8rem] border border-border/75 bg-white shadow-card">
                      <div className="relative h-56 bg-[radial-gradient(circle_at_top_left,rgba(224,1,34,0.18),transparent_46%),linear-gradient(135deg,#f5ede5_0%,#ffffff_40%,#f2f2f2_100%)] p-4">
                        <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                          <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                            VERIFIED
                          </span>
                          <span className="rounded-full border border-black/5 bg-black/85 px-3 py-1 text-[11px] font-semibold text-white">
                            Clifton
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/12 to-transparent" />
                        <div className="absolute left-8 top-[4.5rem] h-28 w-36 rounded-[2rem] border border-white/80 bg-white/85 shadow-xl" />
                        <div className="absolute right-7 top-12 h-36 w-44 rounded-[2.2rem] border border-white/80 bg-[linear-gradient(145deg,#f7efe6_0%,#ffffff_100%)] shadow-xl" />
                        <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/80 bg-white/88 p-4 backdrop-blur">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            2 bed · furnished · private bath
                          </p>
                          <div className="mt-2 flex items-end justify-between gap-3">
                            <div>
                              <h2 className="font-heading text-3xl font-semibold text-foreground">
                                Jefferson House
                              </h2>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Walkable to campus with bright shared living spaces.
                              </p>
                            </div>
                            <div className="rounded-2xl bg-primary px-3 py-2 text-right text-white shadow-lg shadow-primary/20">
                              <p className="text-[10px] uppercase tracking-[0.16em] text-white/80">
                                from
                              </p>
                              <p className="text-lg font-semibold">$825</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>

                    <div className="grid gap-4">
                      <div className="rounded-[1.7rem] border border-border/70 bg-[#fff7f0] p-5 shadow-card">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          What matters fast
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground">
                          <li>High-contrast rent and date visibility</li>
                          <li>Photo-first trust without marketplace clutter</li>
                          <li>Clear signals for furnished and room type</li>
                        </ul>
                      </div>

                      <div className="rounded-[1.7rem] border border-border/70 bg-[linear-gradient(160deg,rgba(51,51,51,0.98)_0%,rgba(24,24,24,0.95)_100%)] p-5 text-white shadow-card">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                          Bearcat standard
                        </p>
                        <p className="mt-3 font-heading text-3xl font-semibold leading-tight">
                          Soft surfaces. Hard clarity.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/75">
                          A warmer editorial shell with disciplined red accents keeps the product local and trustworthy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="grid gap-4 border-t border-border/80 pt-8 text-sm text-muted-foreground sm:grid-cols-3"
          >
            <div className="rounded-[1.5rem] border border-border/70 bg-muted/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Browse</p>
              <p className="mt-3 text-base font-semibold text-foreground">
                Start with the listing dashboard, not a wall of noise.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-muted/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Verify</p>
              <p className="mt-3 text-base font-semibold text-foreground">
                Use photos, availability, and room facts as trust signals.
              </p>
            </div>
            <div
              id="why-bearcat"
              className="rounded-[1.5rem] border border-border/70 bg-muted/50 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Act</p>
              <p className="mt-3 text-base font-semibold text-foreground">
                Reach the right listing faster with a cleaner Cincinnati-native interface.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
