
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { getAllMoviesWithDetails } from "@/data/mockData";
import { MovieWithDetails } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [movies, setMovies] = useState<MovieWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);
  
  useEffect(() => {
    // Simulating API call
    const searchMovies = async () => {
      try {
        setLoading(true);
        const allMovies = getAllMoviesWithDetails();
        
        const filtered = query
          ? allMovies.filter(movie => 
              movie.title.toLowerCase().includes(query.toLowerCase()) || 
              movie.summary.toLowerCase().includes(query.toLowerCase())
            )
          : [];
        
        setTimeout(() => {
          setMovies(filtered);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error searching movies:', error);
        setLoading(false);
      }
    };
    
    searchMovies();
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          Search Results
        </h1>
        
        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <Input
              type="search"
              placeholder="Search movies..."
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
        
        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-pulse-gentle bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent font-heading text-2xl">
              Searching...
            </div>
          </div>
        ) : (
          <>
            {query && (
              <p className="text-muted-foreground mb-6">
                {movies.length === 0 
                  ? "No results found" 
                  : `Found ${movies.length} result${movies.length === 1 ? '' : 's'} for "${query}"`}
              </p>
            )}
            
            {movies.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {movies.map((movie) => (
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

export default SearchResults;
