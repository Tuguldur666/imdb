
import { Link } from "react-router-dom";
import { Movie } from "@/types/database";
import { categories, movieCategories } from "@/data/mockData";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  // Get movie categories
  const movieCats = movieCategories
    .filter(mc => mc.movie_id === movie.movie_id)
    .map(mc => categories.find(c => c.cat_code === mc.cat_code))
    .filter(Boolean);

  return (
    <Link to={`/movie/${movie.movie_id}`}>
      <div className="movie-card group">
        {/* Poster Image */}
        <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
          
          {/* Rating */}
          <div className="absolute top-2 right-2 rating-circle bg-black/70 text-white border border-pink">
            <div className="flex items-center">
              <Star className="w-3 h-3 text-pink mr-0.5" fill="#FF90BB" />
              <span>{movie.rate.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Age Rating */}
          <div className="absolute top-2 left-2 px-1.5 py-0.5 text-xs font-medium rounded bg-burgundy text-white">
            {movie.age_rate}
          </div>
          
          {/* Movie Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <h3 className="text-white font-heading font-medium text-lg leading-tight mb-1">{movie.title}</h3>
            
            <div className="flex flex-wrap gap-1 mt-1.5">
              {movieCats.slice(0, 2).map((cat, index) => (
                cat && (
                  <span 
                    key={index}
                    className="category-badge text-xs" 
                    style={{ 
                      backgroundColor: `${cat.cat_color}40`,
                      color: cat.cat_color
                    }}
                  >
                    {cat.cat_name}
                  </span>
                )
              ))}
              <span className="text-xs text-white/80">{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
