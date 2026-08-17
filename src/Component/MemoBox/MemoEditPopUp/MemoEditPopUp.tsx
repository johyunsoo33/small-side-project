"use client";

import {
  useActionState,
  useEffect,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import { X, Pin } from "lucide-react";
import { EditMemo } from "@/src/functions/CalenderTaskAdd";
import { MemoProps } from "@/src/types/addTaskType";

interface MemoEditPopUpProps {
  memo: MemoProps | null;
  onClose: () => void;
}

export default function MemoEditPopUp({ memo, onClose }: MemoEditPopUpProps) {
  const MemoAddContentArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const stopPopUpClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const [state, formAction, isLoading] = useActionState(EditMemo, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.ok === 1) {
      onClose();
      router.refresh();
    }
  }, [state]);

  if (!memo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="taskAddPopUpBox memo-card group relative w-11/12 max-w-lg -rotate-1 transition-transform duration-300 hover:rotate-0"
        onClick={stopPopUpClick}
      >
        {/* 워시테이프 */}
        <div className="absolute -top-3 left-9 z-10 h-6 w-20 -rotate-3 border border-[#E8604C]/10 bg-[#FFD966]/85 shadow-sm" />

        <div className="relative flex flex-col justify-between rounded-sm border border-[#2B2620]/10 bg-[#FDF6E9] p-6 shadow-[6px_6px_0_0_rgba(43,38,32,0.15)]">
          {/* 닫기 버튼 (아이콘) */}
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-1.5 text-[#2B2620]/40 transition-all duration-150 hover:rotate-90 hover:bg-[#2B2620]/5 hover:text-[#E8604C] active:scale-90"
          >
            <X size={18} />
          </button>

          <header className="mb-5 flex items-center gap-2">
            <Pin size={16} className="-rotate-45 text-[#E8604C]" />
            <p className="text-lg font-bold tracking-tight text-[#2B2620]">
              메모 수정
            </p>
          </header>

          <main>
            <form
              key={memo._id}
              id="memo-form"
              action={formAction}
              className="flex flex-col gap-5"
            >
              <input type="hidden" name="id" defaultValue={memo._id} />
              {/* 제목 - 플로팅 라벨 */}
              <div className="relative">
                <input
                  id="memo-title"
                  name="title"
                  type="text"
                  placeholder=" "
                  defaultValue={memo.title}
                  className="peer w-full border-b-2 border-[#2B2620]/15 bg-transparent px-1 pb-1.5 pt-5 text-[#2B2620] outline-none transition-colors duration-200 focus:border-[#E8604C]"
                />
                <label
                  htmlFor="memo-title"
                  className="pointer-events-none absolute left-1 top-5 text-sm text-[#2B2620]/40 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#E8604C] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  메모 제목
                </label>
              </div>

              {/* 설명 - 플로팅 라벨, 높이는 기존 로직 그대로 사용 */}
              <div className="relative">
                <textarea
                  id="memo-desc"
                  name="content"
                  placeholder=" "
                  rows={2}
                  defaultValue={memo.content}
                  onChange={MemoAddContentArea}
                  className="peer w-full resize-none overflow-hidden border-b-2 border-[#2B2620]/15 bg-transparent px-1 pb-1.5 pt-5 text-[#2B2620] outline-none transition-colors duration-200 focus:border-[#E8604C]"
                />
                <label
                  htmlFor="memo-desc"
                  className="pointer-events-none absolute left-1 top-5 text-sm text-[#2B2620]/40 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#E8604C] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  메모 설명
                </label>
              </div>

              {/* 날짜 두 개 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    id="start-date"
                    name="startDate"
                    type="date"
                    defaultValue={memo.startDate.split("T")[0]}
                    className="w-full border-b-2 border-[#2B2620]/15 bg-transparent px-1 pb-1.5 pt-5 text-sm text-[#2B2620] outline-none transition-colors duration-200 focus:border-[#E8604C]"
                  />
                  <label
                    htmlFor="start-date"
                    className="pointer-events-none absolute left-1 top-0 text-xs font-medium text-[#2B2620]/50"
                  >
                    시작일
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="end-date"
                    name="endDate"
                    type="date"
                    defaultValue={memo.endDate.split("T")[0]}
                    className="w-full border-b-2 border-[#2B2620]/15 bg-transparent px-1 pb-1.5 pt-5 text-sm text-[#2B2620] outline-none transition-colors duration-200 focus:border-[#E8604C]"
                  />
                  <label
                    htmlFor="end-date"
                    className="pointer-events-none absolute left-1 top-0 text-xs font-medium text-[#2B2620]/50"
                  >
                    마감일
                  </label>
                </div>
              </div>

              {/* 첨부 이미지 */}
              <div className="relative">
                <label className="mb-1 block text-xs font-medium text-[#2B2620]/50">
                  첨부 이미지
                </label>
                <input
                  id="memo-attachment"
                  name="attachment"
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-[#2B2620]/70 file:mr-3 file:rounded-sm file:border-0 file:bg-[#2B2620]/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#2B2620] hover:file:bg-[#2B2620]/20"
                />
              </div>
            </form>
          </main>

          <footer className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-[#2B2620]/15 px-4 py-2 text-sm text-[#2B2620]/60 transition-all duration-150 hover:bg-[#2B2620]/5 active:scale-95"
            >
              닫기
            </button>
            <button
              type="submit"
              form="memo-form"
              disabled={isLoading}
              className="rounded-sm bg-[#E8604C] px-5 py-2 text-sm font-medium text-[#FDF6E9] shadow-[3px_3px_0_0_#2B2620] transition-all duration-100 hover:brightness-105 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
            >
              {isLoading ? "수정하는 중..." : "수정하기"}
            </button>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.9) rotate(-4deg) translateY(12px);
          }
          70% {
            opacity: 1;
            transform: scale(1.02) rotate(-1deg) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(-1deg) translateY(0);
          }
        }
        .memo-card {
          animation: popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </div>
  );
}
