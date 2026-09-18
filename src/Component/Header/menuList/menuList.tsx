"use client";

import { useState } from "react";
import MenuItem, { MenuContentProps } from "../menuItem/menuItem";

// 항목이 늘어날 때 JSX 를 복사하지 않도록 목록으로 빼둔다.
// 순서가 그대로 등장 순서(animationDelay)가 된다.
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

export default function MenuList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 열린 메뉴를 absolute 로 띄운다. 세로 배열이라 흐름에 두면
    // 열 때마다 아래 내용이 패널 높이만큼 통째로 밀려 내려간다.
    <div className="relative p-3">
      <button
        type="button"
        className="relative w-6 h-6 cursor-pointer"
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* 열리면 두 줄이 겹쳐지며 X 가 된다.
            ref 로 className 을 직접 갈아끼우면 React 가 알고 있는 DOM 과 어긋나므로
            isOpen 에서 클래스를 계산한다. 색도 bg-white 대신 bg-foreground 를 써야
            라이트 모드(#f7f6f3)에서 흰 줄이 배경에 묻히지 않는다. */}
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
        // gap-3 인 이유: 3d 버튼이 아래로 6px 짜리 단면 그림자를 갖고 있어서
        // 간격이 이보다 좁으면 다음 버튼과 붙어 보인다.
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
