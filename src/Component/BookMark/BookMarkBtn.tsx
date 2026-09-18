"use client";
import Image from "next/image";
import { MouseEvent } from "react";

interface BookMarkBtnProps {
  id: string;
  isBookmarked: boolean;
  onClick: (id: string) => void;
}

// [북마크] 북마크 토글 버튼. 상태는 서버 값(prop)을 그대로 그린다.
export default function BookMarkBtn({
  id,
  isBookmarked,
  onClick,
}: BookMarkBtnProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 카드 클릭까지 번지지 않게
    onClick(id);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex p-0 border-0 bg-transparent leading-none"
    >
      <Image
        src={
          isBookmarked
            ? "/Icons/bookmark_click.svg"
            : "/Icons/bookmark_none_click.svg"
        }
        alt={isBookmarked ? "북마크 클릭후" : "북마크 클릭전"}
        width={24}
        height={24}
        className="block"
      />
    </button>
  );
}
