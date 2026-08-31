"use client";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";

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

  // 서버 값이 바뀌면(새로고침·router.refresh 후) 로컬 상태도 맞춘다.
  // useState 초기값은 첫 렌더에서만 쓰이므로 이게 없으면 서버 값과 어긋난다.
  useEffect(() => {
    setMarked(isBookmarked);
  }, [isBookmarked]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // ② 카드 클릭까지 번지지 않게
    setMarked(!marked); // 응답을 기다리지 않고 먼저 토글
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
          marked
            ? "/Icons/bookmark_click.svg"
            : "/Icons/bookmark_none_click.svg"
        }
        alt={marked ? "북마크 클릭후" : "북마크 클릭전"}
        width={24}
        height={24}
        className="block"
      />
    </button>
  );
}
