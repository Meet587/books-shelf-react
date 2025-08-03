import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RootState } from "@/store/store";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  Star,
  Users,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FavoriteButton } from "./favorite-button";

interface BookDetails {
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
  saleInfo?: {
    country?: string;
    saleability?: string;
    isEbook?: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
    buyLink?: string;
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    pdf?: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed?: boolean;
  };
}

interface BookDetailsProps {
  bookId: string;
}

const BookDetails = ({ bookId }: BookDetailsProps) => {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const favoritesCount = favorites.length;

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError("Failed to load book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  if (loading) {
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
  }

  if (error || !book || !bookId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-6" onClick={handleGoBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>

            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book not found</h3>
              <p className="text-muted-foreground">
                {error || "The requested book could not be found."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { volumeInfo, saleInfo } = book;
  const bestImage =
    volumeInfo.imageLinks?.large ||
    volumeInfo.imageLinks?.medium ||
    volumeInfo.imageLinks?.thumbnail ||
    volumeInfo.imageLinks?.smallThumbnail;
console.log(bestImage)
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={handleGoBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-[3/4] relative mb-4">
                    {bestImage ? (
                      <img
                        src={bestImage.replace(
                          "http://books.google.com",
                          ""
                        )}
                        alt={volumeInfo.title}
                        width={300}
                        height={400}
                        className="object-cover rounded-lg"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                        <BookOpen className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mb-4">
                    <FavoriteButton
                      book={book}
                      size="default"
                      className="bg-background border shadow-sm hover:bg-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    {volumeInfo.previewLink && (
                      <Button asChild className="w-full">
                        <a
                          href={volumeInfo.previewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Preview Book
                        </a>
                      </Button>
                    )}
                    {saleInfo?.buyLink && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <a
                          href={saleInfo.buyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Buy Book
                        </a>
                      </Button>
                    )}
                    {volumeInfo.infoLink && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <a
                          href={volumeInfo.infoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          More Info
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl lg:text-3xl">
                    {volumeInfo.title}
                  </CardTitle>
                  {volumeInfo.subtitle && (
                    <p className="text-lg text-muted-foreground">
                      {volumeInfo.subtitle}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {volumeInfo.authors && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        by {volumeInfo.authors.join(", ")}
                      </span>
                    </div>
                  )}

                  {volumeInfo.averageRating && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{volumeInfo.averageRating}/5</span>
                      {volumeInfo.ratingsCount && (
                        <span className="text-muted-foreground">
                          ({volumeInfo.ratingsCount} ratings)
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {volumeInfo.publisher && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Publisher:</span>
                        <span>{volumeInfo.publisher}</span>
                      </div>
                    )}
                    {volumeInfo.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(volumeInfo.publishedDate).getFullYear()}
                        </span>
                      </div>
                    )}
                    {volumeInfo.pageCount && (
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{volumeInfo.pageCount} pages</span>
                      </div>
                    )}
                  </div>

                  {volumeInfo.categories && (
                    <div>
                      <h4 className="font-medium mb-2">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {volumeInfo.categories.map((category, index) => (
                          <Badge key={index} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {volumeInfo.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: volumeInfo.description,
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {volumeInfo.language && (
                      <div>
                        <span className="font-medium">Language:</span>
                        <span className="ml-2">
                          {volumeInfo.language.toUpperCase()}
                        </span>
                      </div>
                    )}
                    {volumeInfo.printType && (
                      <div>
                        <span className="font-medium">Print Type:</span>
                        <span className="ml-2">{volumeInfo.printType}</span>
                      </div>
                    )}
                    {saleInfo?.isEbook !== undefined && (
                      <div>
                        <span className="font-medium">E-book Available:</span>
                        <span className="ml-2">
                          {saleInfo.isEbook ? "Yes" : "No"}
                        </span>
                      </div>
                    )}
                    {volumeInfo.maturityRating && (
                      <div>
                        <span className="font-medium">Maturity Rating:</span>
                        <span className="ml-2">
                          {volumeInfo.maturityRating}
                        </span>
                      </div>
                    )}
                  </div>

                  {volumeInfo.industryIdentifiers &&
                    volumeInfo.industryIdentifiers.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2">Identifiers</h4>
                          <div className="space-y-1 text-sm">
                            {volumeInfo.industryIdentifiers.map(
                              (identifier, index) => (
                                <div key={index}>
                                  <span className="font-medium">
                                    {identifier.type}:
                                  </span>
                                  <span className="ml-2 font-mono">
                                    {identifier.identifier}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}

                  {saleInfo?.listPrice && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Pricing</h4>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="font-medium">List Price:</span>
                            <span className="ml-2">
                              {saleInfo.listPrice.amount}{" "}
                              {saleInfo.listPrice.currencyCode}
                            </span>
                          </div>
                          {saleInfo.retailPrice && (
                            <div>
                              <span className="font-medium">Retail Price:</span>
                              <span className="ml-2">
                                {saleInfo.retailPrice.amount}{" "}
                                {saleInfo.retailPrice.currencyCode}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BookDetails);
