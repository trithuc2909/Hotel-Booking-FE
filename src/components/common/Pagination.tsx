const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  total,
  pageSize,
  onPageSizeChange,
}: Props) {
  const hasEnhanced =
    total !== undefined &&
    pageSize !== undefined &&
    onPageSizeChange !== undefined;

  const currentCount = Math.min(pageSize ?? 0, total ?? 0);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
              {PAGE_SIZE_OPTIONS.map((s) => (
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
          className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer ${
              p === page
                ? "bg-[#0D99FF] text-white"
                : "border hover:bg-gray-50 text-gray-600"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  );
}
