import type { Book } from "@/pages/home";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const BookFeature = ({
  books,
  loading,
  hasSearched,
  truncateText,
}: {
  books: Book[];
  loading: boolean;
  hasSearched: boolean;
  truncateText: (text: string, maxLength: number) => string;
}) => {
  const fetchImage = async (thumbnailUrl: string | undefined) => {
    try {
      const response = await fetch(thumbnailUrl || "");
      const blob = await response.blob();
      return URL.createObjectURL(blob) as string;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  return (
    <>
      {hasSearched && !loading && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {books.length > 0
              ? `Found ${books.length} books`
              : "No books found"}
          </h2>
        </div>
      )}

      {books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="h-full flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {book.volumeInfo.imageLinks?.thumbnail ? (
                      <img
                        // TODO: Image is not displaying
                        // src={
                        //   book.volumeInfo.imageLinks.thumbnail.replace(
                        //     "http:",
                        //     "https:"
                        //   ) || "/placeholder.svg"
                        // }
                        src={
                          `https://images.weserv.nl/?url=${book.volumeInfo.imageLinks.thumbnail.replace(
                            "http:",
                            "https:"
                          )}` || "/placeholder.svg"
                        }
                        alt={book.volumeInfo.title}
                        width={80}
                        height={120}
                        className="rounded-md object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-20 h-30 bg-muted rounded-md flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">
                      {book.volumeInfo.title}
                    </h3>
                    {book.volumeInfo.authors && (
                      <p className="text-sm text-muted-foreground mb-2">
                        by {book.volumeInfo.authors.join(", ")}
                      </p>
                    )}
                    {book.volumeInfo.publishedDate && (
                      <p className="text-xs text-muted-foreground">
                        Published:{" "}
                        {new Date(book.volumeInfo.publishedDate).getFullYear()}
                      </p>
                    )}
                  </div>
                </div>

                {book.volumeInfo.description && (
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {truncateText(
                        book.volumeInfo.description.replace(/<[^>]*>/g, ""),
                        150
                      )}
                    </p>
                  </div>
                )}

                {book.volumeInfo.categories && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex flex-wrap gap-1">
                      {book.volumeInfo.categories
                        .slice(0, 2)
                        .map((category, index) => (
                          <span
                            key={index}
                            className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default BookFeature;
