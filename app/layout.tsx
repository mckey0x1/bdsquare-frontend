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
  title: "bdsquare - Premium Fashion & Clothing",
  description:
    "Discover premium quality clothing and fashion accessories at ClothesStore. Shop the latest trends in fashion."
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
                <RouteLoader/>
                {children}
                </main>
            </ClientLayout>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
