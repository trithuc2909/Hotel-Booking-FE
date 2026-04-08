import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Props<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyMessage?: string;
  gridTemplateColumns?: string;
}

export function DataTable<TData>({
  columns,
  data,
  emptyMessage = "Không tìm thấy dữ liệu",
  gridTemplateColumns = "1fr",
}: Props<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="grid border-b px-6 py-3"
          style={{ gridTemplateColumns }}
        >
          {headerGroup.headers.map((header) => (
            <div
              key={header.id}
              className="text-xs font-semibold text-gray-400"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </div>
          ))}
        </div>
      ))}

      {table.getRowModel().rows.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-400">
          {emptyMessage}
        </p>
      ) : (
        table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="grid items-center border-b px-6 py-4 hover:bg-gray-50"
            style={{ gridTemplateColumns }}
          >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
