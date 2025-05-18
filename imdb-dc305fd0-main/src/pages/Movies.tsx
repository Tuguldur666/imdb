import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // ✅ NEW
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { getAllMovies, searchMovie } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams] = useSearchParams(); // ✅ Get query param

  // Read URL search param and set it to state (on load or URL change)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q); // ✅ Initialize searchQuery from URL
  }, [searchParams]);

  // Fetch all movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();
        if (response && response.data) {
          setMovies(response.data);
          setFilteredMovies(response.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Perform search
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await searchMovie(searchQuery);
          setFilteredMovies(response?.data || []);
        } catch (error) {
          console.error("Search failed:", error);
          setFilteredMovies([]);
        }
      } else {
        setFilteredMovies(movies);
      }
    };
    fetchSearchResults();
  }, [searchQuery, movies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No-op since search comes from Navbar
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          All Movies
        </h1>

        {/* Optional Local Search (if needed) */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mb-8">
          <Input
            type="search"
            placeholder="Search movies by title..."
            className="bg-muted border-none focus:ring-1 focus:ring-pink"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="bg-pink hover:bg-pink/80">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-xl text-white animate-pulse">Loading...</div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No movies found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
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
                release_date={movie.release_date || "Unknown"}
                categories={movie.categories || []}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
