import { bookmarkMemo, bookmarkTask } from "@/src/functions/CalenderTaskAdd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, StickyNote } from "lucide-react";
import BookMarkBtn from "../../BookMark/BookMarkBtn";

interface BookMarkItemProps {
  imgSrc?: string;
  title: string;
  content: string;
  startAt: string;
  deadLineAt: string;
  _id: string;
  // 일정과 메모가 섞여 있어 북마크를 맞는 API 로 보내려면 출처가 필요하다
  type: "task" | "memo";
  onClick?: () => void;
  isBookMarked: boolean;
}

// [북마크] 북마크 목록의 카드 하나
export default function BookMarkItem({
  imgSrc,
  title,
  content,
  startAt,
  deadLineAt,
  _id,
  type,
  onClick,
  isBookMarked,
}: BookMarkItemProps) {
  const router = useRouter();

  // 서버에 반영한 뒤 새로 그려 최신 isBookMarked 를 받아온다
  const toggleBookmark = async (id: string) => {
    await (type === "task" ? bookmarkTask(id) : bookmarkMemo(id));
    router.refresh();
  };

  return (
    <li
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-cream-200 bg-white p-5 transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(120,80,40,0.3)]"
    >
      <figure
        className={`grid w-full grid-rows-[auto_auto_1fr] gap-y-1 ${
          imgSrc ? "grid-cols-[64px_1fr] gap-x-4" : "grid-cols-1"
        }`}
      >
        {imgSrc && (
          <Image
            alt=""
            src={imgSrc}
            width={64}
            height={64}
            unoptimized
            className="col-start-1 row-start-1 row-span-3 h-full w-full self-stretch rounded-lg object-cover"
          />
        )}
        <figcaption
          className={`row-start-1 flex items-center gap-2 font-semibold text-ink-900 ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
        >
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              type === "task"
                ? "bg-clay-100 text-clay-600"
                : "bg-honey-100 text-honey-500"
            }`}
          >
            {type === "task" ? <CalendarDays size={12} /> : <StickyNote size={12} />}
            {type === "task" ? "일정" : "메모"}
          </span>
          {title}
          <BookMarkBtn
            id={_id}
            isBookmarked={isBookMarked}
            onClick={toggleBookmark}
          />
        </figcaption>
        <div
          className={`row-start-2 flex gap-2 text-xs text-ink-600 ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
        >
          <time>{startAt.split("T")[0]}</time>
          <span>~</span>
          <time>{deadLineAt.split("T")[0]}</time>
        </div>
        <div
          className={`row-start-3 truncate text-sm text-ink-600 ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </figure>
    </li>
  );
}
