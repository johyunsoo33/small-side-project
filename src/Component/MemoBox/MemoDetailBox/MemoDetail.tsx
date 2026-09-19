"use client";

import Image from "next/image";
import { MouseEvent } from "react";
import { X, Pin } from "lucide-react";
import { MemoProps } from "@/src/types/addTaskType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MemoDetailProps {
  memo: MemoProps | null;
  onClose: () => void;
}

// [메모] 메모 상세 팝업
export default function MemoDetail({ memo, onClose }: MemoDetailProps) {
  const stopDetailClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!memo) return null;

  const imgSrc = memo.attachment
    ? `${API_URL}/uploads/${memo.attachment.filename}`
    : undefined;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40"
      onClick={onClose}
    >
      <div
        className="memo-card group relative w-11/12 max-w-lg -rotate-1 transition-transform duration-300 hover:rotate-0"
        onClick={stopDetailClick}
      >
        <div className="relative flex flex-col justify-between rounded-sm border border-ink-900/10 bg-cream-50 p-6 shadow-[6px_6px_0_0_rgba(43,38,32,0.15)]">
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-1.5 text-ink-900/40 transition-all duration-150 hover:rotate-90 hover:bg-ink-900/5 hover:text-clay-500 active:scale-90"
          >
            <X size={18} />
          </button>

          <header className="mb-5 flex items-center gap-2">
            <Pin size={16} className="-rotate-45 text-clay-500" />
            <p className="text-lg font-bold tracking-tight text-ink-900">
              {memo.title}
            </p>
          </header>

          <main className="flex flex-col gap-4">
            {imgSrc && (
              <Image
                alt=""
                src={imgSrc}
                width={200}
                height={200}
                unoptimized
                className="w-full max-h-60 rounded-md object-cover"
              />
            )}
            <div
              className="text-sm text-ink-900/80"
              dangerouslySetInnerHTML={{ __html: memo.content }}
            />
            <div className="flex gap-2 text-xs text-ink-900/50">
              <time>{memo.startDate.split("T")[0]}</time>
              <span>~</span>
              <time>{memo.endDate.split("T")[0]}</time>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
