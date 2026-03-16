import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  totalItems: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

export default function Pagination({
  totalItems,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const start = totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-2 border-t border-[#dce7f2] px-4 py-3 text-xs text-[#6f859b] sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex items-center gap-4">
        <span>
          Showing {start}-{end} of {totalItems}
        </span>

        <label className="inline-flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            className="rounded-md border border-[#dce7f2] bg-[#f8fbff] px-2 py-0.5 text-xs text-[#3f5f7a] outline-none"
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#dce7f2] bg-white text-[#6f859b] disabled:opacity-50"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === page;
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={
                isActive
                  ? "inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#2f86d8] bg-[#2f86d8] text-white"
                  : "inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#dce7f2] bg-white text-[#6f859b]"
              }
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#dce7f2] bg-white text-[#6f859b] disabled:opacity-50"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
