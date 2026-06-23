import MemoItem from "./MemoItem";

export default function MemoList() {
  return (
    <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
      <MemoItem
        imgSrc="/Icons/calender_add.svg"
        title="할일 제목"
        content="할일 텍스트"
        startAt="2026.06.23"
        deadLineAt="2026.06.30"
      />
      <MemoItem
        imgSrc="/Icons/calender_add.svg"
        title="할일 제목"
        content="할일 텍스트"
        startAt="2026.06.23"
        deadLineAt="2026.06.30"
      />
      <MemoItem
        imgSrc=""
        title="할일 제목"
        content="할일 텍스트"
        startAt="2026.06.23"
        deadLineAt="2026.06.30"
      />
    </ol>
  );
}
