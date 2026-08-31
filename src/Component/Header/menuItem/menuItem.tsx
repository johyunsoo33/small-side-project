import Image from "next/image";
import Link from "next/link";

interface MenuContentProps {
  content?: string;
  targetLink: string;
  imagePath?: string;
  styleName?: string;
}

export default function MenuItem({
  content,
  targetLink,
  imagePath,
  styleName,
}: MenuContentProps) {
  return (
    <li className={`p-3 ${styleName || ""}`} id="menuItem">
      <Link href={`/${targetLink}`}>
        {content ? (
          content
        ) : imagePath ? (
          <Image
            src={imagePath}
            alt={`${targetLink} 아이콘`}
            width={24}
            height={24}
            style={{ objectFit: "contain", margin: "0 auto" }}
          />
        ) : null}
      </Link>
    </li>
  );
}
