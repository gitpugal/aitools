import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "AINext.tools - Find best ai tools and alternatives that will make your job easy!!",
  description:
    "AINext.tools is an ai tools directory it is used to find the best ai tools and alternatives or similar kind of ai tools that will make your job easy. it may present it different categories from free to paid.",
  twitter: {
    card: "AINext.tools",
    title: "AINext.tools - Find best ai tools and alternatives that will make your job easy!!",
    description:
      "AINext.tools is an ai tools directory it is used to find the best ai tools and alternatives or similar kind of ai tools that will make your job easy. it may present it different categories from free to paid.",
    creator: "@bharathid07",
  },
  metadataBase: new URL("https://aitoolshub.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
