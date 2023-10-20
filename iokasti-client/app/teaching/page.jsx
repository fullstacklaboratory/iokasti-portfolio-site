import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getTeachings } from "@/lib/teaching";
import { AiOutlineLink } from "react-icons/ai";

const Teaching = async () => {
  const content = await getTeachings();
  return (
    <div>
      <h1>Teaching</h1>
      <ul>
        {content.map((item, i) => {
          return (
            <li key={i} className="text-white">
              <h1>{item.title}</h1>
              <Image
                src={item.image}
                width="480"
                height="280"
                priority={i === 0}
                alt="image"
              />
              <p>{item.description}</p>
              <p className="flex">
                Where : {item.place}{" "}
                <Link href={item.external_url} target="_blank">
                  <AiOutlineLink />
                </Link>
              </p>
              {item.regular_schedule ? <div>
                <p>Day : {item.weekday}</p>
                <p>from : {item.from} - to {item.to} </p>
              </div> : }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Teaching;
