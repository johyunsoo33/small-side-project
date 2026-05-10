import Link from "next/link";

interface menuContentProps {
  content: string;
  targetLink: string;
}

export default function MenuItem({ content, targetLink }: menuContentProps) {
  return (
    <>
      <li className="border-b-blue-500 border-1 p-3" id="menuItem">
        <Link href={`/${targetLink}`}>{content}</Link>
      </li>
    </>
  );
}
