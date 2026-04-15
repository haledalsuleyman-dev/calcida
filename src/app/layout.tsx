import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/utils";
import { websiteJsonLd, organizationJsonLd } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Calcida",
    default: 'Financial Calculators for Mortgages, Loans & Paychecks',
  },
  description: 'Compare mortgage, loan, salary, tax, and retirement scenarios with fast financial calculators built for clear answers and practical planning.',
  authors: [{ name: "Calcida" }],
  creator: "Calcida",
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getSiteUrl(),
    siteName: 'Calcida',
    title: 'Financial Calculators for Mortgages, Loans & Paychecks | Calcida',
    description: 'Compare mortgage, loan, salary, tax, and retirement scenarios with fast financial calculators built for clear answers and practical planning.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@calcida',
    creator: '@calcida',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M35P98B1RR"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M35P98B1RR');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vsrh9plocq");
          `}
        </Script>
        {/* Global structured data: WebSite (Sitelinks Searchbox) + Organization (E-E-A-T) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd(), organizationJsonLd()]),
          }}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
