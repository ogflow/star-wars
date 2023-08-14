import { theme } from "@/theme/theme";
import { Grommet } from "grommet";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars App",
  description: "Created by Sergey Smirnov",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Grommet theme={theme} full>
          {children}
        </Grommet>
      </body>
    </html>
  );
}
