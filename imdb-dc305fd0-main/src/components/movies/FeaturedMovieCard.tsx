
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MovieWithDetails } from "@/types/database";
import { Play, Star, Clock } from "lucide-react";

interface FeaturedMovieCardProps {
  movie: MovieWithDetails;
}

const FeaturedMovieCard = ({ movie }: FeaturedMovieCardProps) => {
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
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.categories?.map((category) => (
              <Link 
                key={category.cat_code}
                to={`/category/${category.cat_code}`}
                className="category-badge" 
                style={{ 
                  backgroundColor: `${category.cat_color}30`,
                  color: category.cat_color
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {category.cat_name}
              </Link>
            ))}
          </div>
          
          {/* Title */}
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {movie.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-pink mr-1" fill="#FF90BB" />
              <span className="text-white">{movie.rate.toFixed(1)}/10</span>
            </div>
            <div className="flex items-center">
              <span className="px-1.5 py-0.5 bg-burgundy text-xs font-medium rounded text-white">
                {movie.age_rate}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">
                {Math.floor(movie.time / 60)}h {movie.time % 60}m
              </span>
            </div>
            <div className="text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </div>
          </div>
          
          {/* Summary */}
          <p className="text-muted-foreground max-w-2xl mb-6">
            {movie.summary}
          </p>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link to={`/movie/${movie.movie_id}`}>
              <Button className="bg-pink hover:bg-pink/80">
                <Play className="mr-2 h-4 w-4" /> Watch Trailer
              </Button>
            </Link>
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
