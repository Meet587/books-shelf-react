import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { _clearFavorite } from "@/store/favorites/action";
import type { RootState } from "@/store/store";
import { ArrowLeft, BookOpen, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

export default function Favorites() {
  const { favorites } = useSelector((state: RootState) => state.favorite);
  const favoritesCount = favorites.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
              <h1 className="text-3xl font-bold">My Favorites</h1>
              <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                {favoritesCount}
              </span>
            </div>
          </div>

          {favorites.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No favorite books yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start adding books to your favorites by clicking the heart icon
                on any book card.
              </p>
              <Link to="/">
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Books
                </Button>
              </Link>
            </div>
          )}

          {favorites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((book) => (
                <Link key={book.id} to={`/book/${book.id}`}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer relative">
                    <div className="absolute top-2 right-2 z-10">
                      <FavoriteButton book={book} />
                    </div>

                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-shrink-0">
                          {book.volumeInfo.imageLinks?.thumbnail ? (
                            <img
                              src={
                                book.volumeInfo.imageLinks.thumbnail.replace(
                                  "http:",
                                  "https:"
                                ) || "/placeholder.svg"
                              }
                              alt={book.volumeInfo.title}
                              width={80}
                              height={120}
                              className="rounded-md object-cover"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="w-20 h-30 bg-muted rounded-md flex items-center justify-center">
                              <BookOpen className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
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
                              {new Date(
                                book.volumeInfo.publishedDate
                              ).getFullYear()}
                            </p>
                          )}
                          {book.volumeInfo.averageRating && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ⭐ {book.volumeInfo.averageRating}/5
                              {book.volumeInfo.ratingsCount &&
                                ` (${book.volumeInfo.ratingsCount})`}
                            </p>
                          )}
                        </div>
                      </div>

                      {book.volumeInfo.description && (
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {truncateText(
                              book.volumeInfo.description.replace(
                                /<[^>]*>/g,
                                ""
                              ),
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
                </Link>
              ))}
            </div>
          )}

          {favorites.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(_clearFavorite());
                }}
              >
                Clear All Favorites
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
