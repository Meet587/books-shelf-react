import BookFeature from "@/components/BookFeature";
import Pagination from "@/components/Pagination";
import SearchCard from "@/components/SearchCard";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
  };
}

export interface SearchFilters {
  title: string;
  author: string;
  genre: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    title: "",
    author: "",
    genre: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(12);

  const buildSearchQuery = (filters: SearchFilters): string => {
    const queryParts: string[] = [];

    if (filters.title.trim()) {
      queryParts.push(`intitle:${filters.title.trim()}`);
    }

    if (filters.author.trim()) {
      queryParts.push(`inauthor:${filters.author.trim()}`);
    }

    if (filters.genre.trim()) {
      queryParts.push(`subject:${filters.genre.trim()}`);
    }

    return queryParts.length > 0 ? queryParts.join("+") : "javascript";
  };

  const searchBooks = async (e: React.FormEvent, page = 1) => {
    e?.preventDefault();

    if (
      !filters.title.trim() &&
      !filters.author.trim() &&
      !filters.genre.trim()
    ) {
      setError("Please enter at least one search criteria");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const query = buildSearchQuery(filters);
      const startIndex = (page - 1) * itemsPerPage;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&startIndex=${startIndex}&maxResults=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data.items || []);
      setTotalItems(data.totalItems || 0);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to search books. Please try again.");
      setBooks([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      searchBooks(null as any, page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Book Search</h1>
            </div>
            <p className="text-muted-foreground">
              Search for books by title, author, or genre using the Google Books
              API
            </p>
          </div>

          <SearchCard
            handleInputChange={handleInputChange}
            searchBooks={searchBooks}
            filters={filters}
            loading={loading}
            error={error}
          />

          <BookFeature
            books={books}
            loading={loading}
            hasSearched={hasSearched}
            truncateText={truncateText}
          />

          <Pagination
            books={books}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />

          {hasSearched && !loading && books.length === 0 && !error && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or using different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
