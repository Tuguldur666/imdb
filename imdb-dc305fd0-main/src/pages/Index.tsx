
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import FeaturedMovieCard from "@/components/movies/FeaturedMovieCard";
import { Button } from "@/components/ui/button";
import { getAllMoviesWithDetails, getMovieWithDetails, categories } from "@/data/mockData";
import { MovieWithDetails } from "@/types/database";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [featuredMovie, setFeaturedMovie] = useState<MovieWithDetails | null>(null);
  const [movies, setMovies] = useState<MovieWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API calls with setTimeout
    const fetchData = async () => {
      try {
        // Get a random featured movie (movie id between 1-6)
        const randomMovieId = Math.floor(Math.random() * 6) + 1;
        const featured = getMovieWithDetails(randomMovieId);
        const allMovies = getAllMoviesWithDetails();
        
        setTimeout(() => {
          if (featured) setFeaturedMovie(featured);
          setMovies(allMovies);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
          {/* Hero Section */}
          {featuredMovie && <FeaturedMovieCard movie={featuredMovie} />}
          
          {/* Popular Movies */}
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
                <MovieCard key={movie.movie_id} movie={movie} />
              ))}
            </div>
          </section>
          
          {/* Categories Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.cat_code}
                  to={`/category/${category.cat_code}`}
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
        </>
      )}
    </Layout>
  );
};

export default Index;
