import { ApolloProvider } from "@findmyspot/network";
import { ToastContainer } from "@findmyspot/ui/app/components/molecules/Toast";
import "@findmyspot/ui/app/globals.css";
import { MenuItem } from "@findmyspot/util/types";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@findmyspot/ui/app/components/molecules/SessionProvider";
import { Header } from "@findmyspot/ui/app/components/organisms/Header";
import { Container } from "@findmyspot/ui/app/components/atoms/Container";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find my spot",
  description: "Find my spot - Manage your garages",
};

const MENUITEMS: MenuItem[] = [
  { label: 'New Garage', href: '/new-garage' },
  { label: 'Valets', href: '/valets' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <ApolloProvider>
            <Header type="manager" menuItems={MENUITEMS}  />
            <Container>{children}</Container>
          </ApolloProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
