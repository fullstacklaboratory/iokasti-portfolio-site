import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getTeachings } from "@/lib/teaching";
import { AiOutlineLink } from "react-icons/ai";

const Teaching = async () => {
  const content = await getTeachings();
  console.log(content);
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
                Where : {item.place_name}{" "}
                <Link href={item.external_url} target="_blank">
                  <AiOutlineLink />
                </Link>
              </p>
              <div>
                <article
                  dangerouslySetInnerHTML={{ __html: item.map_url }}
                ></article>
              </div>
              {item.regular_schedule ? (
                <div>
                  <p>Day : {item.weekday}</p>
                  <p>
                    from : {item.from.slice(0, 4)} - to {item.to}{" "}
                  </p>
                </div>
              ) : (
                <div>
                  <h1>Upcoming dates</h1>
                  <ul>
                    {item.upcoming_dates.map((date, i) => {
                      return (
                        <li key={i}>
                          {date.upcoming_date.split("-").reverse().join("-")}{" "}
                          {date.from.slice(0, 5)} - {date.to.slice(0, 5)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Teaching;
