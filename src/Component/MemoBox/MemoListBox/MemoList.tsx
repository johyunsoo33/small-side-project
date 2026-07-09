import { TaskProps } from "@/src/types/addTaskType";
import MemoItem from "./MemoItem";
import DOMPurify from "isomorphic-dompurify";

export default function MemoList({ memoList }: { memoList: TaskProps[] }) {
  return (
    <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
      {memoList.map((item) => (
        <MemoItem
          title={item.title}
          content={item.content}
          startAt={item.startDate}
          deadLineAt={item.endDate}
        />
      ))}
    </ol>
  );
}
