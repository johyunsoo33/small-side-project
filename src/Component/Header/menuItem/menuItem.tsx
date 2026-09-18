import Image from "next/image";
import Link from "next/link";

export interface MenuContentProps {
  content?: string;
  targetLink: string;
  imagePath?: string;
  styleName?: string;
  // 항목마다 조금씩 늦게 나타나게 하려고 부모가 순서대로 넣어준다.
  animationDelay?: string;
}

export default function MenuItem({
  content,
  targetLink,
  imagePath,
  styleName,
  animationDelay,
}: MenuContentProps) {
  return (
    // 버튼 모양(패딩, 색, 3d 그림자)은 li 가 아니라 Link 에 준다.
    // li 에 주면 그 안의 a 는 inline 이라 글자 크기만큼만 차지해서
    // 패딩과 늘어난 너비가 전부 클릭되지 않는 영역이 되어버린다.
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
