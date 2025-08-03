import BookFeature from "@/components/BookFeature";
import { Button } from "@/components/ui/button";
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

          <BookFeature
            books={favorites}
            loading={false}
            hasSearched={false}
            truncateText={truncateText}
          />

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
