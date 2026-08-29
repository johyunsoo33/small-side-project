"use client";
import Image from "next/image";
import { MouseEvent, useState } from "react";

interface BookMarkBtnProps {
  id: string;
  isBookmarked: boolean; // ① 서버 값을 초기값으로
  onClick: (id: string) => void;
}
export default function BookMarkBtn({
  id,
  isBookmarked,
  onClick,
}: BookMarkBtnProps) {
  const [marked, setMarked] = useState(isBookmarked);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // ② 카드 클릭까지 번지지 않게
    setMarked(!marked);
    onClick(id);
  };
  return (
    <button type="button" onClick={handleClick}>
      <Image
        src={
          marked
            ? "/Icons/bookmark_click.svg"
            : "/Icons/bookmark_none_click.svg"
        }
        alt={marked ? "북마크 클릭후" : "북마크 클릭전"}
        width={24}
        height={24}
      />
    </button>
  );
}
