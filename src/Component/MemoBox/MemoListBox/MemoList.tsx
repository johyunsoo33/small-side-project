import { MemoProps } from "@/src/types/addTaskType";
import MemoItem from "./MemoItem";
import DOMPurify from "isomorphic-dompurify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MemoList({ memoList }: { memoList: MemoProps[] }) {
  return (
    <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
      {memoList.map((item) => (
        <MemoItem
          imgSrc={
            item?.attachment
              ? `${API_URL}/uploads/${item.attachment.filename}`
              : undefined
          }
          _id={item._id}
          title={item.title}
          content={item.content}
          startAt={item.startDate}
          deadLineAt={item.endDate}
        />
      ))}
    </ol>
  );
}
