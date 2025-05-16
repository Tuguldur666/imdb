import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import FeaturedMovieCard from "@/components/movies/FeaturedMovieCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  getAllMovies,
  getAllCategories,
  getMovieDetail,
  getAllWishlistedMovies,
  addToWishlist,        
  removeFromWishlist,   
} from "@/api/api";

interface Category {
  cat_id: string;
  cat_name: string;
  cat_color: string;
  cat_code: string;
}

interface Movie {
  movie_id: string;
  title: string;
  summary?: string;
  poster?: string;
  trailer?: string;
  genres?: any[];
  actors?: any[];
  categories?: Category[];
  rate?: number;
  age_rate?: string;
  release_date?: string;
  wishlisted?: boolean;
  [key: string]: any;
}

const Index = () => {
  const [wishlistMovies, setWishlistMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all initial data and set states
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [movieRes, categoryRes, wishlistRes] = await Promise.all([
        getAllMovies(),
        getAllCategories(),
        getAllWishlistedMovies(),
      ]);

      const allMovies = movieRes.data || [];
      const allCategories = categoryRes.data || [];
      const wishlist = wishlistRes.data || [];

      setCategories(allCategories);
      setWishlistMovies(wishlist);

      const detailedMovies = await Promise.all(
        allMovies.map(async (movie: any) => {
          const res = await getMovieDetail(String(movie.movie_id));
          const detail = res.data?.[0];
          const isWishlisted = wishlist.some((w) => w.movie_id === movie.movie_id);
          return detail
            ? { ...movie, ...detail, wishlisted: isWishlisted }
            : { ...movie, wishlisted: isWishlisted };
        })
      );

      const validMovies = detailedMovies.filter(Boolean) as Movie[];
      setMovies(validMovies);

      if (validMovies.length > 0) {
        const randomMovie =
          validMovies[Math.floor(Math.random() * validMovies.length)];
        setFeaturedMovie(randomMovie);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const toggleWishlist = async (movieId: string) => {
    // Optimistically update UI first
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.movie_id === movieId ? { ...movie, wishlisted: !movie.wishlisted } : movie
      )
    );

    setWishlistMovies((prevWishlist) => {
      // If movie already in wishlist, remove it
      if (prevWishlist.some((m) => m.movie_id === movieId)) {
        return prevWishlist.filter((m) => m.movie_id !== movieId);
      }
      // Otherwise, add the movie (find from movies)
      const movieToAdd = movies.find((m) => m.movie_id === movieId);
      if (movieToAdd) {
        return [...prevWishlist, { ...movieToAdd, wishlisted: true }];
      }
      return prevWishlist;
    });

    // Then sync with backend
    try {
      const isCurrentlyWishlisted = movies.find((m) => m.movie_id === movieId)?.wishlisted;

      if (isCurrentlyWishlisted) {
        // Movie was wishlisted, so remove it from backend wishlist
        await removeFromWishlist(movieId);
      } else {
        // Movie was not wishlisted, so add it
        await addToWishlist(movieId);
      }
      // After successful backend update, fetch fresh wishlist to sync state perfectly
      const wishlistRes = await getAllWishlistedMovies();
      const freshWishlist = wishlistRes.data || [];
      setWishlistMovies(freshWishlist);

      // Also update movies wishlisted flag based on fresh wishlist
      setMovies((prevMovies) =>
        prevMovies.map((movie) => ({
          ...movie,
          wishlisted: freshWishlist.some((w) => w.movie_id === movie.movie_id),
        }))
      );
    } catch (error) {
      console.error("Failed to update wishlist on server:", error);
      // Optionally revert UI changes or show error
      fetchAllData(); // fallback: reload all data on error
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="animate-pulse-gentle bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent font-heading text-2xl">
            Loading...
          </div>
        </div>
      ) : (
        <>
          {featuredMovie && <FeaturedMovieCard movie={featuredMovie} />}

          <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                Popular Movies
              </h2>
              <Link to="/movies">
                <Button variant="link" className="text-pink hover:text-pink/80">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.slice(0, 6).map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie_id={movie.movie_id}
                  title={movie.title}
                  poster={
                    movie.poster?.startsWith("http")
                      ? movie.poster
                      : `http://127.0.0.1:8000/${movie.poster}`
                  }
                  rate={movie.rate || 0}
                  age_rate={movie.age_rate || "N/A"}
                  release_date={movie.release_date || ""}
                  categories={movie.categories || []}
                  wishlisted={movie.wishlisted ?? false}
                  onToggleWishlist={() => toggleWishlist(movie.movie_id)}
                />
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.cat_id}
                  to={`/category/${category.cat_id}`}
                  className="group relative h-32 rounded-lg overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-90"
                    style={{ backgroundColor: category.cat_color }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-heading font-bold text-xl text-white">
                      {category.cat_name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {wishlistMovies.length > 0 && (
            <section className="container mx-auto px-4 py-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                  My Wishlist
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
             {wishlistMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie_id={movie.movie_id}
                  title={movie.title}
                  poster={
                    movie.poster?.startsWith("http")
                      ? movie.poster
                      : `http://127.0.0.1:8000/${movie.poster}`
                  }
                  rate={movie.rate || 0}
                  age_rate={movie.age_rate || "N/A"}
                  release_date={movie.release_date || ""}
                  categories={movie.categories || []}
                  wishlisted={true}
                  hideWishlistToggle={true}  
  />
))}


              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
};

export default Index;
