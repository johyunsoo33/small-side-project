import { bookmarkMemo, deleteMemo } from "@/src/functions/CalenderTaskAdd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import BookMarkBtn from "../../BookMark/BookMarkBtn";
interface MemoItemProps {
  imgSrc?: string;
  title: string;
  content: string;
  startAt: string;
  deadLineAt: string;
  _id: string;
  onClick?: () => void;
  onEdit?: () => void;
  isBookMarked: boolean;
}

// [메모] 메모 목록의 카드 하나. 북마크·삭제·수정 버튼을 갖는다.
export default function MemoItem({
  imgSrc,
  title,
  content,
  startAt,
  deadLineAt,
  _id,
  onClick,
  onEdit,
  isBookMarked,
}: MemoItemProps) {
  const router = useRouter();

  const deleteMemoBtn = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.stopPropagation();
    deleteMemo(id);
    router.refresh();
  };

  const modifyMemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit?.();
  };

  // 서버에 반영한 뒤 새로 그려 최신 isBookMarked 를 받아온다
  const toggleBookmark = async (id: string) => {
    await bookmarkMemo(id);
    router.refresh();
  };

  return (
    <li
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-cream-200 bg-white p-5 transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(120,80,40,0.3)]"
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

      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          title="수정"
          onClick={modifyMemo}
          className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-cream-100 hover:text-ink-900"
        >
          <Pencil size={18} />
        </button>
        <button
          type="button"
          title="삭제"
          onClick={(event) => deleteMemoBtn(event, _id)}
          className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-clay-100 hover:text-clay-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
