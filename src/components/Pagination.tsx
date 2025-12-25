interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

export function Pagination({ currentPage, onPageChange, hasMore }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm bg-[#1a1a1a] border border-gray-700 text-gray-300 rounded-lg hover:bg-[#222] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>

      <div className="px-4 py-2 text-sm text-gray-300">
        Page {currentPage}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        className="px-4 py-2 text-sm bg-[#1a1a1a] border border-gray-700 text-gray-300 rounded-lg hover:bg-[#222] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivant
      </button>
    </div>
  );
}
