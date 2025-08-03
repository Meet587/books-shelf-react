import type { Book } from "@/pages/home";
import { Button } from "./ui/button";
import { memo } from "react";

const Pagination = ({
  books,
  loading,
  currentPage,
  totalPages,
  handlePageChange,
  itemsPerPage,
  totalItems,
}: {
  books: Book[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}) => {
  return (
    <div>
      {books.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
            {totalItems.toLocaleString()} results
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {currentPage > 3 && (
                <>
                  <Button
                    variant={1 === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={loading}
                  >
                    1
                  </Button>
                  {currentPage > 4 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                </>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={loading}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant={totalPages === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={loading}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Pagination);
