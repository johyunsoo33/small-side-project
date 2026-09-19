import { Plus } from "lucide-react";
import PageHeader from "../../PageHeader/PageHeader";

interface MemoTopBoxProps {
  createFunction: () => void;
}

// [메모] 페이지 제목 줄과 메모 추가 버튼
export default function MemoTopBox({ createFunction }: MemoTopBoxProps) {
  return (
    <PageHeader
      eyebrow="메모"
      title="떠오르는 순간 메모"
      description="생각이 나는 그 자리에서 바로 적어두세요."
      actions={
        <button
          type="button"
          onClick={createFunction}
          className="flex items-center gap-2 rounded-lg bg-clay-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
        >
          <Plus size={16} />
          메모 추가
        </button>
      }
    />
  );
}
