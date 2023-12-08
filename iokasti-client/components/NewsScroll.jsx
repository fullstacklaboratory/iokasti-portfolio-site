import Link from "next/link";
import styles from "./newsScroll.module.scss";

const NewsScroll = ({ news }) => {
  return (
    <>
      <div className="text-white fixed bottom-0 p-2 backdrop-blur-sm border-t border-t-white w-screen">
        <div className={styles.text}>
          {news.map((item) => {
            return (
              <Link href={`projects/${item.slug}`} className="mr-4">
                {new Date(item.starting_date).toLocaleDateString()}:{item.title}
              </Link>
            );
          })}
          {/* <Link href={`projects}`} className="mr-4"></Link> */}
        </div>
      </div>
    </>
  );
};

export default NewsScroll;
