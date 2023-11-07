import Link from "next/link";
import "./slide.scss";
import {
  animate,
  calcLength,
  motion,
  useAnimationControls,
  useAnimate,
  useAnimation,
} from "framer-motion";

const NewsSlide = ({ news }) => {
  return (
    <>
      <div className="text-white fixed bottom-0 p-2 backdrop-blur-sm border-t border-t-white w-screen">
        <div className="text">
          {news.map((item) => {
            return (
              <Link href={`projects/${item.slug}`} className="mr-4">
                {new Date(item.starting_date).toLocaleDateString()}:{item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NewsSlide;
