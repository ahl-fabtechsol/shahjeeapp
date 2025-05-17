import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/queryProvider";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Make Easy - Your Worldwide Marketplace",
  description: "Find products from suppliers around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Toaster position="top-center" richColors expand={true} />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
