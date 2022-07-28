import "./Page.css";

import React from "react";
import Masonry from "react-masonry-css";
import Images from "./ImgCard";

const Page = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <Images />
        <Images />
        <Images />
        <Images />
        <Images />
      </Masonry>
    </div>
  );
};

export default Page;
