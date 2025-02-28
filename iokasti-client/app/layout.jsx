import NavBar from "@/components/NavBar";
import { getNavData, getNewsData } from "@/lib/landingPage";
import "./globals.scss";

let PUBLIC_DOMAIN;

if (process.env.NODE_ENV === "development") {
  PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_ENV_DOMAIN_ADDRESS_DEV;
} else {
  PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_ENV_DOMAIN_ADDRESS_PROD;
}

export const metadata = {
  // metadataBase: new URL(PUBLIC_DOMAIN),
  // canonical: PUBLIC_DOMAIN,
  title: { default: "Iokasti Mantzog", template: "%s | Iokasti Mantzog" },
  description:
  "Iokasti Mantzog , is an artist , movement teacher , facilitator and witch , based between Berlin and Athens.",
  keywords: [
    "Dancer",
    "Berlin Dancing",
    "Performer",
    "Berlin Performer",
    "Dance classes berlin",
    "Pilates",
    "Berlin Pilates"
  ],
  openGraph: {
    title: { default: "Iokasti Mantzog", template: "%s | Iokasti Mantzog" },
    description:
     "Iokasti Mantzog , is an artist , movement teacher , facilitator and witch , based between Berlin and Athens.",
    images: [`/public/opengraph-image.jpg`],
    type: "website",
    url: PUBLIC_DOMAIN,
    locale: "en_US",
  },
};

export default async function RootLayout({ children }) {
  const navData = await getNavData();
  const news = await getNewsData();

  if (navData.error) {
    console.error("Failed to fetch navigation data:", navData.error);
  }

  if (news.error) {
    console.error("Failed to fetch news data:", news.error);
  }

  return (
    <html lang="en">
      {!navData.error ? (
        <body>
          <header>
            <NavBar navData={navData} newsData={news} />
          </header>
          <main>{children}</main>
        </body>
      ) : (
        <body>
          <main className="error">
            <h1>Ups... Server temporarily down. Please check back later!</h1>
          </main>
        </body>
      )}
    </html>
  );
}
