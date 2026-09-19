import { Plus, Trash2 } from "lucide-react";
import PageHeader from "../../PageHeader/PageHeader";

interface TaskTopBoxProps {
  createTask: () => void;
  deleteTask: () => void;
}

// [일정] 페이지 제목 줄과 일정 추가·삭제 버튼. 월 이동은 달력 카드 안에서 한다.
export default function TaskTopBox({ createTask, deleteTask }: TaskTopBoxProps) {
  return (
    <PageHeader
      eyebrow="캘린더 · 일정"
      title="나만의 캘린더"
      description="날짜를 고르고 제목과 시간만 적으면 일정이 됩니다."
      actions={
        <>
          <button
            type="button"
            onClick={deleteTask}
            className="flex items-center gap-2 rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-cream-100 hover:text-ink-900"
          >
            <Trash2 size={16} />
            삭제
          </button>
          <button
            type="button"
            onClick={createTask}
            className="flex items-center gap-2 rounded-lg bg-clay-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
          >
            <Plus size={16} />
            일정 추가
          </button>
        </>
      }
    />
  );
}
