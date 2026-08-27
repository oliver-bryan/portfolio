import type { Metadata } from "next";
import { Bricolage_Grotesque, Literata } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
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
