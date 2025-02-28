import Link from "next/link";
import styles from "@/components/newsScroll.module.scss";
import { germania } from "@/app/fonts.js";

const NewsScroll = ({ news }) => {
  return (
    <>
      <div className="text-white fixed bottom-0 p-2 backdrop-blur-sm border-t border-t-white w-screen">
        <div className={styles.text}>
          <div className={styles.textContainer}>
            {news.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={`projects/${item.slug}`}
                  className={`hover:text-blue-600 ${germania.className}`}
                >
                  {`
                  ${new Date(item.starting_date).toLocaleDateString()}: 
                  ${item.title}`}
                </Link>
              );
            })}
            {/* <Link href={`projects}`} className="mr-4"> */}
            {/* What Ever */}
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsScroll;
