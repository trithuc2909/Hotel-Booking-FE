import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadCrumbProps = {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
};

export default function Breadcrumb({
  items,
  showHomeIcon = true,
}: BreadCrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-[#0D99FF]"
          >
            {showHomeIcon && <Home size={14} />}
            <span>Trang chủ</span>
          </Link>
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[#0D99FF]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
