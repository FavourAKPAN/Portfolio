import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl, SITE } from "@/config/site";
import BrushCursor from "@/components/BrushCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const title = `${SITE.name} — UX Design & Software QA`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title,
    description: SITE.tagline,
    images: [
      {
        url: "/images/trexpal_cover.jpg",
        width: 1616,
        height: 1264,
        alt: "Trexpal travel app case study cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.tagline,
    images: ["/images/trexpal_cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F3ED" },
    { media: "(prefers-color-scheme: dark)", color: "#141714" },
  ],
};

// Runs before first paint so a saved dark preference never flashes light. Defaults to light.
const themeScript = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-brand-fill focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BrushCursor />
        <Analytics />
      </body>
    </html>
  );
}
