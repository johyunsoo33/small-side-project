import Image from "next/image";
import Link from "next/link";

export interface MenuContentProps {
  content?: string;
  targetLink: string;
  imagePath?: string;
  styleName?: string;
  animationDelay?: string;
}

// [메뉴] 메뉴 버튼 하나. 글자 또는 아이콘 중 하나를 그린다.
export default function MenuItem({
  content,
  targetLink,
  imagePath,
  styleName,
  animationDelay,
}: MenuContentProps) {
  return (
    // 버튼 스타일은 li 가 아니라 Link 에 준다. li 에 주면 a 가 inline 이라
    // 글자 크기만큼만 클릭되고 패딩은 눌러도 반응하지 않는다.
    <li
      className="slide-in-left w-full"
      style={animationDelay ? { animationDelay } : undefined}
    >
      <Link
        href={`/${targetLink}`}
        className={`block w-full p-3 ${styleName || ""}`}
      >
        {content ? (
          content
        ) : imagePath ? (
          <Image
            src={imagePath}
            alt={`${targetLink} 아이콘`}
            width={24}
            height={24}
            className="block mx-auto"
            style={{ objectFit: "contain" }}
          />
        ) : null}
      </Link>
    </li>
  );
}
