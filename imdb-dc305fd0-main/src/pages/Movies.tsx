import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { getAllMovies, searchMovie } from "@/api/api"; // ✅ Real API import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]); // Use 'any' temporarily, replace with proper type later
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching all movies from API...");
        const response = await getAllMovies();

        if (response && response.data) {
          console.log("Fetched movies:", response.data);
          setMovies(response.data);
          setFilteredMovies(response.data); // Show all movies initially
        } else {
          console.warn("No movies returned from API.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Perform search when searchQuery changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() !== "") {
        try {
          console.log("Searching movies...");
          const response = await searchMovie(searchQuery);
          
          if (response && response.data) {
            console.log("Search results:", response.data);
            setFilteredMovies(response.data); // Update filteredMovies with search results
          } else {
            setFilteredMovies([]); // No results found, clear filteredMovies
          }
        } catch (error) {
          console.error("Error searching movies:", error);
          setFilteredMovies([]); // Clear the results if there's an error
        }
      } else {
        setFilteredMovies(movies); // Reset to all movies if the search query is empty
      }
    };

    fetchSearchResults();
  }, [searchQuery, movies]); // Dependencies include searchQuery and movies

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is now handled in the useEffect, no need to do anything here
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
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
            <Button type="submit" className="bg-pink hover:bg-pink/80">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        {/* Movie Grid */}
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
                    onClick={() => setSearchQuery("")} // Clear search query
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredMovies.map((movie) => {
                  // Ensure we have all the necessary movie data
                  console.log("Rendering movie:", movie);
                  return (
                    <MovieCard
                      key={movie.movie_id}
                      movie_id={movie.movie_id}
                      title={movie.title}
                      poster={movie.poster}
                      rate={movie.rate || 0} // Set default value if rate is missing
                      age_rate={movie.age_rate || "N/A"} // Set default value if age_rate is missing
                      release_date={movie.release_date || "Unknown"} // Set default value if release_date is missing
                      categories={movie.categories || []} // Set empty array if categories are missing
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
