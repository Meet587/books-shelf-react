import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Book } from "@/pages/home";
import { _removeFavorite, _setFavoriteList } from "@/store/favorites/action";
import type { RootState } from "@/store/store";
import { Heart } from "lucide-react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FavoriteButtonProps {
  book: Book;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const FavoriteButton = memo(
  ({ book, size = "sm", className }: FavoriteButtonProps) => {
    const dispatch = useDispatch();
    const isBookFavorite = useSelector((state: RootState) =>
      state.favorite.favorites.some((favorite) => favorite.id === book.id)
    );

    const handleToggleFavorite = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent navigation when clicking on search results
      e.stopPropagation();

      if (isBookFavorite) {
        dispatch(_removeFavorite(book.id));
      } else {
        dispatch(_setFavoriteList(book));
      }
    };

    return (
      <Button
        variant="ghost"
        size={size}
        onClick={handleToggleFavorite}
        className={cn(
          "p-1 h-auto hover:bg-background/80 transition-colors",
          isBookFavorite && "text-red-500 hover:text-red-600",
          !isBookFavorite && "text-muted-foreground hover:text-foreground",
          className
        )}
        title={isBookFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            isBookFavorite && "fill-current scale-110"
          )}
        />
      </Button>
    );
  }
);
