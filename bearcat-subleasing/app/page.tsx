import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheckBig,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse verified Cincinnati student subleases with a trust-first marketplace built for near-campus housing.",
};

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex flex-1 flex-col p-5 sm:p-8 lg:p-10">
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

          <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,500px)] lg:gap-12 lg:py-16">
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
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-[#b8011c] sm:px-9"
                >
                  Go to listing dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/listings/create"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-border bg-white px-8 py-4 text-base font-semibold text-foreground transition hover:border-primary/25 hover:text-primary sm:px-9"
                >
                  Post your sublease
                </Link>
              </div>

            </div>

            <div className="relative mx-auto w-full max-w-[31rem]">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.98)_0%,rgba(255,250,246,0.94)_52%,rgba(234,219,193,0.66)_100%)] p-5 shadow-soft sm:p-6">
                <div className="absolute inset-x-12 top-4 h-20 rounded-full bg-primary/6 blur-3xl" />

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

                  <article className="overflow-hidden rounded-[1.8rem] border border-border/75 bg-white shadow-card">
                    <div className="relative h-[24rem] bg-[radial-gradient(circle_at_top_left,rgba(224,1,34,0.18),transparent_46%),linear-gradient(135deg,#f5ede5_0%,#ffffff_40%,#f2f2f2_100%)] p-4 sm:h-[26rem] sm:p-5">
                      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                        <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                          VERIFIED
                        </span>
                        <span className="rounded-full border border-black/5 bg-black/85 px-3 py-1 text-[11px] font-semibold text-white">
                          Clifton
                        </span>
                      </div>
                      <div className="absolute left-8 top-18 h-36 w-40 rounded-[2.1rem] border border-white/80 bg-white/80 shadow-xl" />
                      <div className="absolute right-7 top-14 h-44 w-48 rounded-[2.4rem] border border-white/80 bg-[linear-gradient(145deg,#f7efe6_0%,#ffffff_100%)] shadow-xl" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/80 bg-white/90 p-5 backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          2 bed · furnished · private bath
                        </p>
                        <div className="mt-3 flex items-end justify-between gap-3">
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
