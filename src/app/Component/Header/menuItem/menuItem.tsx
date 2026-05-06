interface menuContentProps {
  content: string;
}

export default function MenuItem({ content }: menuContentProps) {
  return (
    <>
      <li className="border-b-blue-500 border-1 p-3">{content}</li>
    </>
  );
}
