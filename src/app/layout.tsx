import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloud Bond — Your AI Employee That Gets Work Done",
  description:
    "Cloud Bond is an AI-powered business employee that understands your context, connects to your tools, and carries out real work on your behalf. Delegate work, don't just chat.",
  keywords: [
    "AI employee",
    "AI workforce",
    "business automation",
    "delegation",
    "AI assistant for business",
    "Cloud Bond",
  ],
  authors: [{ name: "Wilson Cloud Limited" }],
  openGraph: {
    title: "Cloud Bond — Your AI Employee That Gets Work Done",
    description:
      "Cloud Bond is an AI-powered business employee that understands your context, connects to your tools, and carries out real work on your behalf.",
    type: "website",
    locale: "en_GB",
    siteName: "Cloud Bond",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Bond — Your AI Employee That Gets Work Done",
    description:
      "Cloud Bond is an AI-powered business employee that carries out real work on your behalf.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { const saved = document.cookie.match(/(?:^|; )theme=(dark|light)/)?.[1]; const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; })()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
