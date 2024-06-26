import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Roadbuster IMS",
  description: "Inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter" suppressHydrationWarning={false}>
      <body className={roboto.className}>
        <AuthProvider>
          <NavBar />
          <main className="mt-[3px]">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
