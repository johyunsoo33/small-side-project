import Image from "next/image";
import Link from "next/link";

interface menuContentProps {
  content?: string;
  targetLink: string;
  imagePath?: string;
}

export default function MenuItem({
  content,
  targetLink,
  imagePath,
}: menuContentProps) {
  return (
    <>
      <li className="border-b-blue-500 border-1 p-3" id="menuItem">
        <Link href={`/${targetLink}`}>
          {" "}
          {content ? (
            content
          ) : (
            <Image
              src={`${imagePath}`}
              alt={`${targetLink}아이콘`}
              width={24}
              height={24}
            />
          )}
        </Link>
      </li>
    </>
  );
}
