import MemoItem from "./MemoItem";
import DOMPurify from "isomorphic-dompurify";

interface MemoItemData {
  id: string;
  imgSrc: string;
  title: string;
  content: string; // URL이거나 HTML 문자열
  startAt: string;
  deadLineAt: string;
}

const dummyData: MemoItemData[] = [
  {
    id: "1",
    imgSrc: "/Icons/calender_add.svg",
    title: "할일 제목",
    content: "<p>할일 <b>텍스트</b>입니다</p>",
    startAt: "2026.06.23",
    deadLineAt: "2026.06.30",
  },
  {
    id: "2",
    imgSrc: "/Icons/calender_add.svg",
    title: "할일 제목",
    content: "할일 텍스트",
    startAt: "2026.06.23",
    deadLineAt: "2026.06.30",
  },
  {
    id: "3",
    imgSrc: "",
    title: "할일 제목",
    content: "할일 텍스트",
    startAt: "2026.06.23",
    deadLineAt: "2026.06.30",
  },
];

export default function MemoList() {
  const MemoList: MemoItemData[] = dummyData.map((item) => ({
    ...item,
    content: DOMPurify.sanitize(item.content),
  }));

  return (
    <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
      {MemoList.map((item) => (
        <MemoItem
          key={item.id}
          imgSrc={item.imgSrc}
          title={item.title}
          content={item.content}
          startAt={item.startAt}
          deadLineAt={item.deadLineAt}
        />
      ))}
    </ol>
  );
}
