import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { generateMetadata, generateLocalBusinessSchema } from "@/lib/metadata";
import SEO from "@/components/SEO";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <SEO schema={localBusinessSchema} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#d97706" />
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION || ""} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && process.env.GOOGLE_ANALYTICS_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
