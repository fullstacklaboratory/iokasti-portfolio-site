import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./teaching.module.scss";

import { getTeachings } from "@/lib/teaching";
import { AiOutlineLink } from "react-icons/ai";

const Teaching = async () => {
  // const content = await getTeachings();

  return (
    <div>
      {/* <h1>Teaching</h1>
      <ul>
        {content.map((item, i) => {
          return (
            <li key={i} className="text-white teaching-box">
              <h1 className="" >{item.title}</h1>
            <div className="">
              <div className="">
              <Image
                src={item.image}
                width="480"
                height="280"
                priority={i === 0}
                alt="image"
               
              />

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
              </div>
              <div className="">
              <p>{item.description}</p>
              
              <div>
              <p className="">
              Where :
                <Link href={item.external_url} target="_blank" className="">
                   {item.place_name} <AiOutlineLink />
                </Link>
              </p>
              </div>
              <div>
                <article 
                  dangerouslySetInnerHTML={{ __html: item.map_url }}
                ></article>
              </div>
              </div>
              </div>
              
             
            </li>
          );
        })}
      </ul> */}
      Test
    </div>
  );
};

export default Teaching;
