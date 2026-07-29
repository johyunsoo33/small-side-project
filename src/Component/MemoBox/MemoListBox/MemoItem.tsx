import { deleteMemo } from "@/src/functions/CalenderTaskAdd";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface MemoItemProps {
  imgSrc?: string;
  title: string;
  content: string;
  startAt: string;
  deadLineAt: string;
  _id: string;
  onClick?: () => void;
}

export default function MemoItem({
  imgSrc,
  title,
  content,
  startAt,
  deadLineAt,
  _id,
  onClick,
}: MemoItemProps) {
  const router = useRouter();

  const deleteMemoBtn = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    deleteMemo(id);
    router.refresh();
  };
  const modifyMemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
          }`}
        >
          {title}
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
      <div className=" flex flex-col gap-4 ml-4">
        <button
          type="button"
          className="btn-3d-red font-basic xl:p-2 xl:pl-5 xl:pr-5 lg:p-2 lg:pl-4 lg:pr-4 md:p-1.5 md:pl-3 md:pr-3 sm:p-1.5 sm:pl-2 sm:pr-2 p-1 pl-1.5 pr-1.5 rounded-md xl:text-size-sm lg:text-sm md:text-xs sm:text-xs text-[10px] whitespace-nowrap"
          onClick={(event) => deleteMemoBtn(event, _id)}
        >
          삭제
        </button>
        <button
          type="button"
          className="btn-3d font-basic xl:p-2 xl:pl-5 xl:pr-5 lg:p-2 lg:pl-4 lg:pr-4 md:p-1.5 md:pl-3 md:pr-3 sm:p-1.5 sm:pl-2 sm:pr-2 p-1 pl-1.5 pr-1.5 rounded-md xl:text-size-sm lg:text-sm md:text-xs sm:text-xs text-[10px] whitespace-nowrap"
          onClick={modifyMemo}
        >
          수정
        </button>
      </div>
    </li>
  );
}
