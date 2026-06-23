import Image from "next/image";
interface MemoItemProps {
  imgSrc: string;
  title: string;
  content: string;
  startAt: string;
  deadLineAt: string;
}

export default function MemoItem({
  imgSrc,
  title,
  content,
  startAt,
  deadLineAt,
}: MemoItemProps) {
  return (
    <li className="list-none bg-gray-300/20 rounded-lg w-full min-h-16 flex justify-between items-center p-3">
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
          className={`row-start-2 flex gap-2 text-xs text-white/40 ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
        >
          <time>{startAt}</time>
          <span>~</span>
          <time>{deadLineAt}</time>
        </div>
        <p
          className={`row-start-3 text-sm text-white/70 truncate ${
            imgSrc ? "col-start-2" : "col-start-1"
          }`}
        >
          {content}
        </p>
      </figure>
      <div></div>
    </li>
  );
}
