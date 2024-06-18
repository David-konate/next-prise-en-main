import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import NavBar from "./assets/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explorateur de Héros",
  description: "Découvrez Next.js",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr">
      <Head>
        <title>Explorateur de Héros</title>
        <meta name="description" content="Découvrez Next.js" />
      </Head>
      <body className={inter.className}>
        <NavBar />
        <div className="container mx-auto max-w-7xl p-4">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
