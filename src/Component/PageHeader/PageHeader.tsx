import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

// [공통] 내부 페이지 상단 제목 줄. 작은 라벨 + 명조 제목 + 설명, 오른쪽에 버튼 자리
export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-sm font-semibold text-clay-500">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink-900">
          {title}
        </h1>
        {description && <p className="mt-3 text-ink-600">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
