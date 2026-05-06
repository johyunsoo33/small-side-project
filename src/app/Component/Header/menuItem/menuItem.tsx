interface menuContentProps {
  content: string;
}

export default function MenuItem({ content }: menuContentProps) {
  return (
    <>
      <li>{content}</li>
    </>
  );
}
