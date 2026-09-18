"use client";

import { useState } from "react";
import MenuItem, { MenuContentProps } from "../menuItem/menuItem";

// 메뉴 항목. 배열 순서가 곧 등장 순서다.
const MENU_ITEMS: MenuContentProps[] = [
  {
    content: "일정",
    targetLink: "mySchedule",
    styleName: "btn-3d-yellow rounded-xl text-center",
  },
  {
    content: "메모",
    targetLink: "myMemo",
    styleName: "btn-3d-purple rounded-xl text-center",
  },
  {
    content: "최근 문서",
    targetLink: "recent",
    styleName: "btn-3d-green rounded-xl text-center",
  },
  {
    imagePath: "/Icons/bookmarkIcon.svg",
    targetLink: "importantSchedule",
    styleName: "btn-3d-yellow rounded-xl text-center",
  },
];

// [메뉴] 햄버거 아이콘과 좌측 세로 메뉴 패널
export default function MenuList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 메뉴를 absolute 로 띄운다. 흐름에 두면 열 때마다 본문이 밀려 내려간다.
    <div className="relative p-3">
      <button
        type="button"
        className="relative w-6 h-6 cursor-pointer"
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* 열리면 두 줄이 겹쳐지며 X 가 된다.
            bg-white 가 아닌 bg-foreground 를 쓰는 이유는 라이트 모드에서 묻히지 않게 하려고. */}
        <span
          className={`absolute top-1/2 left-0 w-full h-0.5 bg-foreground origin-center transition-all ${
            isOpen ? "rotate-45" : "-translate-y-1"
          }`}
        />
        <span
          className={`absolute top-1/2 left-0 w-full h-0.5 bg-foreground origin-center transition-all ${
            isOpen ? "-rotate-45" : "translate-y-1"
          }`}
        />
      </button>

      {isOpen ? (
        // gap-3 인 이유: 3d 버튼의 아래쪽 6px 그림자와 겹치지 않게
        <ul className="menu-panel absolute left-3 top-full z-50 mt-2 flex w-36 flex-col gap-3 p-3">
          {MENU_ITEMS.map((item, index) => (
            <MenuItem
              key={item.targetLink}
              {...item}
              animationDelay={`${index * 60}ms`}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
