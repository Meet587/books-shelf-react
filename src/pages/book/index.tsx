import BookDetails from "@/components/BookDetails";
import { Suspense } from "react";
import { useParams } from "react-router";

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Suspense fallback={<BookDetailsLoading />}>
      <BookDetails bookId={id!} />
    </Suspense>
  );
};

export default BookDetailsPage;

const BookDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="h-96 bg-muted rounded"></div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
