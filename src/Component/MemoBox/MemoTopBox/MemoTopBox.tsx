import Image from "next/image";
interface MemoTopBoxProps {
  createFunction: () => void;
}

export default function MemoTopBox({ createFunction }: MemoTopBoxProps) {
  return (
    <div className="taskTopBox max-w-11/12 mt-10 ">
      <div className="taskAdd flex justify-end">
        <button className="mr-2" title="할 일 추가" onClick={createFunction}>
          <Image
            src="/Icons/calender_add.svg"
            alt="메모 추가"
            width={22}
            height={22}
          />
        </button>
      </div>
    </div>
  );
}
