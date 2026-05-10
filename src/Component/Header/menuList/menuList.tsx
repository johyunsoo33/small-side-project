"use client";
import { useRef, useState } from "react";
import MenuItem from "../menuItem/menuItem";

export default function MenuList() {
  const topLineRef = useRef<HTMLDivElement>(null);
  const botLineRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const topLine = topLineRef.current;
    const botLine = botLineRef.current;

    if (topLine && botLine) {
      setIsOpen(!isOpen);

      if (!isOpen) {
        // X 모양으로: 둘 다 중앙으로 이동 + 회전
        topLine.className =
          "absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45 transition-all";
        botLine.className =
          "absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45 transition-all";
      } else {
        // 원래 모양으로: 위아래로 이동 + 회전 해제
        topLine.className =
          "absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1 transition-all";
        botLine.className =
          "absolute top-1/2 left-0 w-full h-0.5 bg-white translate-y-1 transition-all";
      }
    }
  };

  return (
    <div className="border-amber-600 border-1">
      <div className="relative w-6 h-6" id="menuIcon" onClick={handleClick}>
        <div
          ref={topLineRef}
          className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1 origin-center"
          id="menuIconTopLine"
        ></div>
        <div
          ref={botLineRef}
          className="absolute top-1/2 left-0 w-full h-0.5 bg-white translate-y-1 origin-center"
          id="menuIconBotLine"
        ></div>
        {/* <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45 origin-center"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45 origin-center"></div> */}
      </div>

      {isOpen ? (
        <ul className="flex justify-between mt-4">
          {/* 왼쪽 메인 기능 */}
          <div className="flex">
            <MenuItem content="일정" targetLink="mySchedule" />
            <MenuItem content="메모" targetLink="myMemo" />
            <MenuItem content="할 일" targetLink="myTasks" />
          </div>

          {/* 오른쪽 유틸리티 */}
          <div className="flex">
            <MenuItem content="최근 문서" targetLink="recent" />
            <MenuItem
              imagePath="/Icons/bookmarkIcon.svg"
              targetLink="bookmark"
            />
            <MenuItem imagePath="/Icons/trashIcon.svg" targetLink="trash" />
          </div>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
