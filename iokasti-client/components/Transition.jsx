"use client";
import { motion } from "framer-motion";

const Transition = () => {
  return (
    <div style={{width: "100vw", height:"100vh"}}>
      <svg
        viewBox="0 0 3840 2160"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1000,
          position: "absolute",
        }}
      >
        {/* <filter id="blur">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="100"
            result="blurred"
          />
        </filter> */}
        <motion.path
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeLinecap: "round",
            fill: "gold",
            // fillOpacity: 0.2,
            // filter: "url(#blur)"
          }}
          animate={{
            d: [
              "M0 11.5V-400H3840V-179C3840 -179 3460.5 -40 3016.5 -40C2571.89 -40 2110.5 -9.5 1666.5 -58C1252.66 -103.205 1027.01 -82.5 660.5 -82.5C328.5 -82.5 0 11.5 0 11.5Z",
              "M0 218V0H3840V453.5C3840 453.5 3225.04 1010.73 2847 583.5C2566.5 266.5 2225 206 1663.5 955C1413.79 1288.09 1260.26 703.217 754.5 786C81 896.239 0 218 0 218Z",
              "M0 1803.5V0H3840V1855C3840 1855 3406 1544 2859.5 1975.5C2510.55 2251.02 2111.11 1716 1666.5 1716C1250.2 1716 1014 2093.5 667 1975.5C418.171 1890.88 0 1803.5 0 1803.5Z",
              "M0 2211.5V0H3840V2235.5C3840 2235.5 3337 2543.5 2880.5 2383.5C2460.91 2236.44 2301.11 2456 1856.5 2456C1440.2 2456 1082.12 2389.15 884 2697.5C693.5 2994 0 2211.5 0 2211.5Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1.5,
            reverse: true,
            // delay: 5,
          }}
        />
      </svg>
    </div>
  );
};

export default Transition;
