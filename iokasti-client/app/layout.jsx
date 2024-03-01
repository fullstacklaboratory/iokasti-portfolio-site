import NavBar from "@/components/NavBar";
import { getNavData, getNewsData } from "@/lib/landingPage";
import "./globals.scss";

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata
export const metadata = {
  title: { default: "Iokasti Zografou", template: "%s | Iokasti Zografou" },
  description: "Personal website for the performer, dancer and trainer Iokasti",
  keywords: [
    "Dancing",
    "Berlin Dancing",
    "Performer",
    "Berlin Performer",
    "Dance classes berlin",
  ],
  // https://developers.google.com/search/docs/crawling-indexing/special-tags
  // openGraph : { // Important when you want to display on chat's or facebook etc... (check it out)

  //   url :  "https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields"
  // }
};

export default async function RootLayout({ children }) {
  const navData = await getNavData();
  const news = await getNewsData();

  return (
    <html lang="en"
    // className="snap-y snap-mandatory"
    >
      <body className="bg-slate-900">
        <header className="fixed top-0 left-0 right-0 z-10">
          <NavBar navData={navData} newsData={news} />
        </header>

        <main className="min-h-screen absolute top-0 left-0 right-0">{children}</main>
      </body>
    </html>
  );
}
