import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bearcat Subleases collects, uses, and protects your information.",
};

const sections = [
  {
    title: "What We Collect",
    body: "When you create an account or post a listing, we collect your name, UC email address, listing content (title, description, pricing, and availability dates), and any images you upload.",
  },
  {
    title: "How We Use It",
    body: "We use your information to display listings on the marketplace, verify that accounts belong to UC-affiliated students, and enable contact between listing owners and interested users.",
  },
  {
    title: "Data Storage",
    body: "Account and listing data is stored in a Neon PostgreSQL database hosted on AWS. Listing images are stored in AWS S3. Data is retained only as long as your account or listing is active.",
  },
  {
    title: "Who Can See Your Info",
    body: "Listing details are public. Your email address is shown only to signed-in UC users on individual listing detail pages, so that interested students can reach out directly about a sublease.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated June 2026
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Contact
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              For privacy-related questions or requests, use the contact form on the About page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
