import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "@findmyspot/ui/app/globals.css";
import { ApolloProvider } from "@findmyspot/network";
import { SessionProvider } from "@findmyspot/ui/app/components/molecules/SessionProvider";
import { Header } from "@findmyspot/ui/app/components/organisms/Header";
import { Container } from "@findmyspot/ui/app/components/atoms/Container";
import { ToastContainer } from "@findmyspot/ui/app/components/molecules/Toast";
import { MenuItem } from "@findmyspot/util/types";
import MaxWidthWrapper from "@findmyspot/ui/app/components/atoms/MaxWidthWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable:"--font-space-grotesk",
  subsets: ["latin"],
  weight:['300', '400','500', '600', '700'],
});

export const metadata: Metadata = {
  title: "FindMySpot",
  description: "Find My Spot is a platform for finding and booking parking spots.",
};

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body
            className={` font-sans  antialiased bg-whiteColor`}
          >

            <Header menuItems={MENUITEMS} />
            <MaxWidthWrapper>{children}</MaxWidthWrapper>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  );
}
