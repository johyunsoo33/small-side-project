"use client";
import Image from "next/image";
import { useState } from "react";

export default function BookMarkBtn() {
  const [isBookMarked, setIsBookMarked] = useState(false);

  const handleBookMarkClick = () => {
    setIsBookMarked(!isBookMarked);
  };
  return (
    <button onClick={handleBookMarkClick}>
      <Image
        src={
          isBookMarked
            ? "/Icons/bookmark_click.svg"
            : "/Icons/bookmark_none_click.svg"
        }
        alt={isBookMarked ? "북마크 클릭후" : "북마크 클릭전"}
        width={24}
        height={24}
      />
    </button>
  );
}
