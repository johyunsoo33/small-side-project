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
        topLine.className =
          "absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45 transition-all";
        botLine.className =
          "absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45 transition-all";
      } else {
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
      </div>

      {isOpen ? (
        <ul className="flex justify-between mt-4">
          <div className="flex">
            <MenuItem content="일정" targetLink="mySchedule" />
            <MenuItem content="메모" targetLink="myMemo" />
            <MenuItem content="할 일" targetLink="myTask" />
          </div>

          <div className="flex">
            <MenuItem content="최근 문서" targetLink="recent" />
            <MenuItem
              imagePath="/Icons/bookmarkIcon.svg"
              targetLink="bookmark"
            />
            <MenuItem imagePath="/Icons/trashIcon.svg" targetLink="trash" />
          </div>
        </ul>
      ) : null}
    </div>
  );
}
