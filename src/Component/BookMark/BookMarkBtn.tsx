"use client";
import Image from "next/image";
import { MouseEvent } from "react";

interface BookMarkBtnProps {
  id: string;
  isBookmarked: boolean; // 서버 값을 그대로 그린다
  onClick: (id: string) => void;
}
export default function BookMarkBtn({
  id,
  isBookmarked,
  onClick,
}: BookMarkBtnProps) {
  // 서버 값을 로컬 state 로 복사해두면 값이 두 벌이 되어 계속 맞춰줘야 한다.
  // 부모가 북마크 저장 후 router.refresh() 로 새 값을 내려주므로 prop 만 보면 된다.
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
