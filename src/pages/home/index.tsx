import BookFeature from "@/components/BookFeature";
import Pagination from "@/components/Pagination";
import SearchCard from "@/components/SearchCard";
import { Button } from "@/components/ui/button";
import { debounce } from "@/helpers/debounce";
import type { RootState } from "@/store/store";
import { BookOpen, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    readingModes?: {
      text: boolean;
      image: boolean;
    };
    pageCount?: number;
    printType?: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
}

export interface SearchFilters {
  title: string;
  author: string;
  genre: string;
  currentPage?: string;
}

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const favoritesCount = favorites.length;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = extractQueryParams(searchParams);

    setFilters((prev) => ({
      ...prev,
      title: params.title ?? "",
      author: params.author ?? "",
      genre: params.genre ?? "",
    }));

    if (params.currentPage) {
      setCurrentPage(Number(params.currentPage));
    }
  }, []);

  const debounceSearch = debounce(
    () => searchBooks(null as any, currentPage),
    1000
  );

  useEffect(() => {
    if (filters.title || filters.author || filters.genre) {
      debounceSearch();
    }
  }, [filters]);

  const extractQueryParams = (searchParams: URLSearchParams) => {
    const params: SearchFilters = {
      title: searchParams.get("title") || "",
      author: searchParams.get("author") || "",
      genre: searchParams.get("genre") || "",
      currentPage: searchParams.get("currentPage") || "",
    };
    return params;
  };

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

      const pathname = location.pathname;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("title", filters.title);
      searchParams.set("author", filters.author);
      searchParams.set("genre", filters.genre);
      searchParams.set("currentPage", page.toString());
      const nextLocation = { pathname, search: searchParams.toString() };
      navigate(nextLocation);

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

  const resetPagination = () => {
    setCurrentPage(1);
    setTotalItems(0);
  };

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
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Book Explorer</h1>
              </div>
              <Link to="/favorites">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>
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
            resetPagination={resetPagination}
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
