type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded-lg px-3 py-2 text-sm font-medium cursor-pointer
            ${
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
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
      >
        ›
      </button>
    </div>
  );
}
