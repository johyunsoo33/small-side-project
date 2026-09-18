import { bookmarkMemo, bookmarkTask } from "@/src/functions/CalenderTaskAdd";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
      className="list-none bg-gray-300/20 rounded-lg w-full min-h-16 flex justify-between items-center p-3 cursor-pointer"
    >
      <figure
        className={`grid w-full grid-rows-[auto_auto_1fr] gap-y-1 ${
          imgSrc ? "grid-cols-[64px_1fr] gap-x-3" : "grid-cols-1"
        }`}
      >
        {imgSrc ? (
          <Image
            alt=""
            src={imgSrc}
            width={50}
            height={50}
            unoptimized
            className="col-start-1 row-start-1 row-span-3 w-full h-full self-stretch rounded-md object-cover"
          />
        ) : (
          <></>
        )}
        <figcaption
          className={`row-start-1 font-semibold ${
            imgSrc ? "col-start-2" : "col-start-1"
          } flex items-center gap-1`}
        >
          {title}
          <BookMarkBtn
            id={_id}
            isBookmarked={isBookMarked}
            onClick={toggleBookmark}
          />
        </figcaption>
        <div
          className={`row-start-2 flex gap-2 text-xs text-white/55 ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
        >
          <time>{startAt.split("T")[0]}</time>
          <span>~</span>
          <time>{deadLineAt.split("T")[0]}</time>
        </div>
        <div
          className={`row-start-3 text-sm text-white/70 truncate ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </figure>
    </li>
  );
}
