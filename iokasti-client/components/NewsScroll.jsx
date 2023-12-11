import Link from "next/link";
import styles from "./newsScroll.module.scss";

const NewsScroll = ({ news }) => {
  return (
    <>
      <div className="text-white fixed bottom-0 p-2 backdrop-blur-sm border-t border-t-white w-screen">
<<<<<<< HEAD:iokasti-client/components/NewsSlide.jsx
        <div className="text">
          <div className="text-container">
=======
        <div className={styles.text}>
>>>>>>> fc7c60af70e39047909a127d7d5cadef1229b53e:iokasti-client/components/NewsScroll.jsx
          {news.map((item) => {
            return (
              <Link href={`projects/${item.slug}`} className="mr-4">
                {new Date(item.starting_date).toLocaleDateString()}:{item.title}
<<<<<<< HEAD:iokasti-client/components/NewsSlide.jsx
                {/* Lorem ipsum dolor  */}
              </Link>
            );
          })}
           <Link href={`projects}`} className="mr-4"> 
               What Ever
               </Link>
        </div>
=======
              </Link>
            );
          })}
          {/* <Link href={`projects}`} className="mr-4"></Link> */}
>>>>>>> fc7c60af70e39047909a127d7d5cadef1229b53e:iokasti-client/components/NewsScroll.jsx
        </div>
      </div>
    </>
  );
};

export default NewsScroll;
