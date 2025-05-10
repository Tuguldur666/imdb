import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Star, Clock } from "lucide-react";

interface Category {
  cat_id: string;
  cat_name: string;
  cat_color: string;
  cat_code: string;
}

interface Movie {
  movie_id: number | string;
  title: string;
  poster?: string;
  summary?: string;
  rate?: number;
  age_rate?: string;
  time?: number;
  release_date?: string;
  categories?: Category[];
  trailer?: string;  // Assuming trailer URL is included in the movie data
}

interface FeaturedMovieCardProps {
  movie: Movie;
}

const FeaturedMovieCard = ({ movie }: FeaturedMovieCardProps) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!movie) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.categories?.map((category) => (
              <Link
                key={category.cat_id}
                to={`/category/${category.cat_code}`}
                className="category-badge"
                style={{
                  backgroundColor: `${category.cat_color}30`,
                  color: category.cat_color,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {category.cat_name}
              </Link>
            ))}
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-pink mr-1" fill="#FF90BB" />
              <span className="text-white">{Number(movie.rate || 0).toFixed(1)}/10</span>
            </div>
            <div className="flex items-center">
              <span className="px-1.5 py-0.5 bg-burgundy text-xs font-medium rounded text-white">
                {movie.age_rate}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-muted-foreground mr-1" />
              <span>{movie.rate || "No rating"}</span>
            </div>
            <div className="text-muted-foreground">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl mb-6">
            {movie.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-pink hover:bg-pink/80 text-white"
              onClick={() => setShowTrailer(true)}
            >
              <Play className="mr-2 h-4 w-4" /> Watch Trailer
            </Button>
            {showTrailer && (
              <div className="mt-4 fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-5xl">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -top-12 right-0 text-white border-white hover:bg-white/20"
                    onClick={() => setShowTrailer(false)}
                  >
                    <span className="sr-only">Close</span>
                    <span aria-hidden="true" className="text-2xl">
                      &times;
                    </span>
                  </Button>
                  <div className="aspect-video w-full">
                    <iframe
                      src={movie.trailer}  // Assuming movie.trailer contains the trailer URL
                      title={`${movie.title} Trailer`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
            <Link to={`/movie/${movie.movie_id}`}>
              <Button variant="outline" className="border-pink text-pink hover:bg-pink/10">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovieCard;
