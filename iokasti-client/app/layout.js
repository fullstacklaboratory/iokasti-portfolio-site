import NavBar from "@/components/NavBar";
import "./globals.css";

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata
export const metadata = {
  title: { default: "Iokasti Zografou", template: "%s | Dancer" },
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 z-10">
          <NavBar />
        </header>

        <main className="bg-slate-900">{children}</main>
      </body>
    </html>
  );
}
