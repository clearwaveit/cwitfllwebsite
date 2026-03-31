import "./globals.css";
import AppShell from "./components/providers/AppShell";
import { fetchSiteSettings } from "@/app/lib/site-settings-api";

// export const metadata: Metadata = {
//   title: "Your Journey - Modern Web Experiences",
//   description: "Creating beautiful experiences with modern web technologies and smooth animations",
//   icons: {
//     icon: "/icon.png",
//     apple: "/apple-icon.png",
//   },
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await fetchSiteSettings();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-black text-white font-graphik">
        <AppShell siteSettings={siteSettings}>{children}</AppShell>
      </body>
    </html>
  );
}
