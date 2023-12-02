import React from "react";
import Instagram from "@/components/Instagram";
import { getNotebook } from "@/lib/notebook";

const Notebook = async () => {
  const data = await getNotebook();
  const images = data.images.map((item) => {
    {
      return item.attributes.url;
    }
  });

  return <Instagram images={images} />;
};

export default Notebook;
