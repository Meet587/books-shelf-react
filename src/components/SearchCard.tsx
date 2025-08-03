import type { SearchFilters } from "@/pages/home";
import { Label } from "@radix-ui/react-label";
import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

const SearchCard = ({
  handleInputChange,
  searchBooks,
  filters,
  loading,
  error,
  resetPagination,
}: {
  handleInputChange: (field: keyof SearchFilters, value: string) => void;
  searchBooks: (e: React.FormEvent) => void;
  filters: SearchFilters;
  loading: boolean;
  error: string | null;
  resetPagination: () => void;
}) => {
  return (
    <>
      <Card className="mb-8">
        <CardContent className="p-6">
          <form
            onSubmit={(e) => {
              resetPagination();
              searchBooks(e);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter book title..."
                  value={filters.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Enter author name..."
                  value={filters.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre/Keyword</Label>
                <Input
                  id="genre"
                  placeholder="Enter genre or keyword..."
                  value={filters.genre}
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Books
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}
    </>
  );
};

export default SearchCard;
