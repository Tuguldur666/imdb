
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { getAllMoviesWithDetails } from "@/data/mockData";
import { MovieWithDetails } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Movies = () => {
  const [movies, setMovies] = useState<MovieWithDetails[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Simulating API call
    const fetchMovies = async () => {
      try {
        const moviesData = getAllMoviesWithDetails();
        
        setTimeout(() => {
          setMovies(moviesData);
          setFilteredMovies(moviesData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic is handled by the useEffect above
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          All Movies
        </h1>
        
        {/* Search */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
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
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-pulse-gentle bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent font-heading text-2xl">
              Loading...
            </div>
          </div>
        ) : (
          <>
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No movies found</p>
                {searchQuery && (
                  <Button 
                    variant="link" 
                    className="text-pink mt-2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.movie_id} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
