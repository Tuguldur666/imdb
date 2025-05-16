import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

interface Category {
  cat_id: string;
  cat_name: string;
  cat_color: string;
  cat_code: string;
}

interface MovieCardProps {
  movie_id: string | number;
  title: string;
  poster: string;
  rate: number;
  age_rate: string;
  release_date: string;
  categories: Category[];
}

const MovieCard = ({
  movie_id,
  title,
  poster,
  rate,
  age_rate,
  release_date,
  categories,
}: MovieCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation on click
    const action = wishlisted ? "remove" : "add";

    try {
      const res = await fetch(`/api/dt_${action}_wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: `${action}_wishlist`,
          movie_id,
        }),
      });

      const data = await res.json();
      if (data?.status === 200) {
        setWishlisted(!wishlisted);
      } else {
        console.error("Wishlist API error:", data.message);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  return (
    <Link to={`/movie/${movie_id}`}>
      <div className="group rounded-lg overflow-hidden relative aspect-[2/3] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Wishlist Heart Icon */}
        <button
          onClick={toggleWishlist}
          className="absolute bottom-3 right-3 z-10 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 transition-colors"
        >
          <Heart fill={wishlisted ? "#e11d48" : "none"} className="w-5 h-5" />
        </button>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-semibold rounded-full flex items-center gap-1 border border-pink">
          <Star className="w-3 h-3 text-pink" fill="#FF90BB" />
          <span>{rate || "No rating"}</span>
        </div>

        {/* Age Rating */}
        <div className="absolute top-2 left-2 px-1.5 py-0.5 text-xs font-medium rounded bg-burgundy text-white">
          {age_rate}
        </div>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 w-full p-3 group-hover:translate-y-0 translate-y-1 transition-transform duration-300">
          <h3 className="text-white font-heading font-semibold text-base truncate mb-1">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1 items-center text-xs">
            {categories.slice(0, 2).map((cat) => (
              <span
                key={cat.cat_code}
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${cat.cat_color}30`,
                  color: cat.cat_color,
                }}
              >
                {cat.cat_name}
              </span>
            ))}
            <span className="text-white/70 ml-auto">
              {new Date(release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
