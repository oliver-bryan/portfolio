import type { Metadata } from "next";
import { Bricolage_Grotesque, Literata } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";
import "./globals.css";

// Display and UI. Variable, with an optical-size axis, so it holds up at the
// hero's ~200px as well as at nav size.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Reading face, used only for the case study's prose column.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves every relative metadata URL, including the generated OG image.
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: "/",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  // The OG image itself comes from app/opengraph-image.tsx, which Next wires
  // into both openGraph.images and twitter.images automatically.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes writes the theme class before paint, which the server pass
    // cannot know about.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
