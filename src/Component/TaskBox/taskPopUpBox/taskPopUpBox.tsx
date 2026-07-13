"use client";

import {
  useActionState,
  useEffect,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import { X, CalendarPlus } from "lucide-react";
import { calenderAddTask } from "@/src/functions/CalenderTaskAdd";

interface TaskPopUpProps {
  closePopUpFunction: () => void;
  popUpStatus: boolean;
  selectedDate?: Date;
}

export default function TaskPopUpBox({
  closePopUpFunction,
  popUpStatus,
  selectedDate,
}: TaskPopUpProps) {
  const date = selectedDate ?? new Date();
  const day = date.getDate();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" });

  const router = useRouter();
  const [state, formAction, isLoading] = useActionState(calenderAddTask, null);

  useEffect(() => {
    if (state?.ok === 1) {
      router.refresh();
      closePopUpFunction();
    }
  }, [state]);

  const taskAddContentArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const stopPopUpClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return popUpStatus ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F1A]/50 backdrop-blur-sm"
      onClick={closePopUpFunction}
    >
      <div
        className="task-card relative flex w-11/12 max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={stopPopUpClick}
      >
        {/* 왼쪽 날짜 스텁 */}
        <div className="relative flex w-24 shrink-0 flex-col items-center justify-center gap-1 bg-linear-to-b from-[#4F5DFF] to-[#3A46D6] py-6 text-white">
          <span className="text-xs font-medium tracking-wider text-white/70">
            {month}
          </span>
          <span className="text-4xl font-bold leading-none">{day}</span>
          <span className="text-xs text-white/70">{weekday}요일</span>

          {/* 절취선 (티켓 느낌) */}
          <div className="absolute right-0 top-0 h-full border-r-2 border-dashed border-white/25" />
          <div className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-[#0B0F1A]/50" />
          <div className="absolute -bottom-2.5 -right-2.5 h-5 w-5 rounded-full bg-[#0B0F1A]/50" />
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className="relative flex flex-1 flex-col justify-between bg-[#FAFAFC] p-6">
          <button
            type="button"
            aria-label="닫기"
            onClick={closePopUpFunction}
            className="absolute right-3 top-3 rounded-full p-1.5 text-[#0B0F1A]/30 transition-all duration-150 hover:bg-[#0B0F1A]/5 hover:text-[#4F5DFF] active:scale-90"
          >
            <X size={18} />
          </button>

          <header className="mb-4 flex items-center gap-2">
            <CalendarPlus size={16} className="text-[#4F5DFF]" />
            <p className="text-base font-bold tracking-tight text-[#0B0F1A]">
              새 할 일
            </p>
          </header>

          <main>
            <form
              action={formAction}
              className="flex flex-col gap-4"
              id="task-form"
            >
              {/* 제목 - 플로팅 라벨 (박스형) */}
              <div className="relative">
                <input
                  id="task-title"
                  name="title"
                  type="text"
                  placeholder=" "
                  className="peer w-full rounded-lg border border-[#0B0F1A]/10 bg-white px-3 pb-2 pt-5 text-sm text-[#0B0F1A] outline-none transition-all duration-200 focus:border-[#4F5DFF] focus:ring-2 focus:ring-[#4F5DFF]/15"
                />
                <label
                  htmlFor="task-title"
                  className="pointer-events-none absolute left-3 top-4 text-sm text-[#0B0F1A]/35 transition-all duration-200 ease-out peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-[#4F5DFF] peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
                >
                  할 일 제목
                </label>
              </div>

              {/* 설명 */}
              <div className="relative">
                <textarea
                  id="task-desc"
                  name="content"
                  placeholder=" "
                  rows={2}
                  onChange={taskAddContentArea}
                  className="peer w-full resize-none overflow-hidden rounded-lg border border-[#0B0F1A]/10 bg-white px-3 pb-2 pt-5 text-sm text-[#0B0F1A] outline-none transition-all duration-200 focus:border-[#4F5DFF] focus:ring-2 focus:ring-[#4F5DFF]/15"
                />
                <label
                  htmlFor="task-desc"
                  className="pointer-events-none absolute left-3 top-4 text-sm text-[#0B0F1A]/35 transition-all duration-200 ease-out peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-[#4F5DFF] peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
                >
                  할 일 설명
                </label>
              </div>

              {/* 날짜 두 개 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    id="task-start-date"
                    name="startDate"
                    type="date"
                    className="w-full rounded-lg border border-[#0B0F1A]/10 bg-white px-3 pb-2 pt-5 text-xs text-[#0B0F1A] outline-none transition-all duration-200 focus:border-[#4F5DFF] focus:ring-2 focus:ring-[#4F5DFF]/15"
                  />
                  <label
                    htmlFor="task-start-date"
                    className="pointer-events-none absolute left-3 top-1.5 text-[10px] font-medium text-[#0B0F1A]/40"
                  >
                    시작일
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="task-end-date"
                    name="endDate"
                    type="date"
                    className="w-full rounded-lg border border-[#0B0F1A]/10 bg-white px-3 pb-2 pt-5 text-xs text-[#0B0F1A] outline-none transition-all duration-200 focus:border-[#4F5DFF] focus:ring-2 focus:ring-[#4F5DFF]/15"
                  />
                  <label
                    htmlFor="task-end-date"
                    className="pointer-events-none absolute left-3 top-1.5 text-[10px] font-medium text-[#0B0F1A]/40"
                  >
                    마감일
                  </label>
                </div>
              </div>
            </form>
          </main>

          <footer className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={closePopUpFunction}
              className="rounded-lg px-4 py-2 text-sm text-[#0B0F1A]/50 transition-all duration-150 hover:bg-[#0B0F1A]/5 active:scale-95"
            >
              닫기
            </button>
            <button
              type="submit"
              form="task-form"
              className="rounded-lg bg-[#4F5DFF] px-5 py-2 text-sm font-medium text-white transition-all duration-100 hover:bg-[#3A46D6] active:scale-95 active:brightness-90"
            >
              추가하기
            </button>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticketIn {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .task-card {
          animation: ticketIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  ) : null;
}
