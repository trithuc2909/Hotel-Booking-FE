const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  total,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
}: Props) {
  const options = pageSizeOptions || PAGE_SIZE_OPTIONS;

  const hasEnhanced =
    total !== undefined &&
    pageSize !== undefined &&
    onPageSizeChange !== undefined;

  const currentCount = Math.min(pageSize ?? 0, total ?? 0);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const range: (number | string)[] = [];
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPages);
      } else if (page >= totalPages - 3) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          range.push(i);
        }
      } else {
        range.push(1);
        range.push("...");
        range.push(page - 1);
        range.push(page);
        range.push(page + 1);
        range.push("...");
        range.push(totalPages);
      }
    }
    return range;
  }
  return (
    <div className="mt-4 flex items-center justify-between w-full">
      {hasEnhanced && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            Tổng {currentCount} trên {total} dòng
          </span>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0D99FF]"
            >
              {options.map((s) => (
                <option key={s} value={s}>
                  {s} dòng
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-sm disabled:opacity-40 hover:bg-slate-50 transition-all cursor-pointer bg-white"
        >
          ‹
        </button>

        {getVisiblePages().map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-2.5 py-1 text-sm text-gray-400 font-medium select-none"
              >
                ...
              </span>
            );
          }
          const pageNum = p as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${pageNum === page
                ? "bg-[#0D99FF] text-white shadow-md shadow-blue-100"
                : "border border-gray-200 hover:bg-slate-50 hover:text-blue-500 hover:border-blue-300 text-gray-600 bg-white"
                }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-sm disabled:opacity-40 hover:bg-slate-50 transition-all cursor-pointer bg-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}
