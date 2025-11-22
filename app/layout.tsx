import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/cart-context";
import ClientLayout from "@/components/Clientlayout";
import { AuthProvider } from "@/context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { Providers } from "./provider";
import RouteLoader from "@/components/RouteLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "bdsquare - Premium Fashion & Clothing",
    template: "%s | bdsquare"
  },
  description:
    "Discover premium quality clothing and fashion accessories at bdsquare. Shop the latest trends in fashion with free shipping and easy returns.",
  keywords: [
    "fashion",
    "clothing",
    "premium fashion",
    "online shopping",
    "bdsquare",
    "apparel",
    "fashion accessories",
    "trending fashion"
  ],
  authors: [{ name: "bdsquare" }],
  creator: "bdsquare",
  publisher: "bdsquare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bdsquare.com"
  ),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "bdsquare",
    title: "bdsquare - Premium Fashion & Clothing",
    description:
      "Discover premium quality clothing and fashion accessories at bdsquare. Shop the latest trends in fashion.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "bdsquare - Premium Fashion & Clothing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "bdsquare - Premium Fashion & Clothing",
    description:
      "Discover premium quality clothing and fashion accessories at bdsquare.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            <ClientLayout>
              <main className="min-h-screen">
                <RouteLoader />
                {children}
              </main>
            </ClientLayout>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
