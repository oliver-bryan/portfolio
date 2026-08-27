import type { Metadata } from "next";
import { Literata } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

// One family, used at 400 and 600. Literata is a reading face: the case study
// is long-form prose and the type has to hold up at paragraph length, not just
// in headings.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oliver Bryan",
    template: "%s · Oliver Bryan",
  },
  description:
    "Projects and photography by Oliver Bryan, a mobile and web developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes writes the theme class before paint, which the server pass
    // cannot know about.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${literata.variable} h-full antialiased`}
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
