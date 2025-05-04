import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { getMoviesByCategory, categories } from "@/data/mockData";
import { MovieWithDetails, Category } from "@/types/database";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { catCode } = useParams<{ catCode: string }>();
  const [movies, setMovies] = useState<MovieWithDetails[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call
    const fetchCategoryData = async () => {
      try {
        if (!catCode) throw new Error("Category code not found");
        
        const categoryData = categories.find(c => c.cat_code === catCode);
        const moviesData = getMoviesByCategory(catCode);
        
        setTimeout(() => {
          if (categoryData) setCategory(categoryData);
          setMovies(moviesData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [catCode]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[500px]">
          <div className="animate-pulse-gentle bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent font-heading text-2xl">
            Loading...
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Category not found</h2>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="text-pink hover:text-pink/80 underline">Return to Home</Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Header */}
      <div 
        className="py-12"
        style={{ 
          backgroundColor: `${category.cat_color}20`
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4"
            style={{ color: category.cat_color }}
          >
            {category.cat_name} Movies
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {category.cat_desc}
          </p>
        </div>
      </div>
      
      {/* Movie Grid */}
      <div className="container mx-auto px-4 py-12">
        {movies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-muted-foreground">No movies found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.movie_id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      
      {/* Other Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-heading text-2xl font-bold text-white mb-6">
          Other Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories
            .filter(c => c.cat_code !== category.cat_code)
            .map((cat) => (
              <Link 
                key={cat.cat_code}
                to={`/category/${cat.cat_code}`}
                className="group relative h-24 rounded-lg overflow-hidden"
              >
                <div 
                  className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-90"
                  style={{ backgroundColor: cat.cat_color }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-heading font-bold text-xl text-white">
                    {cat.cat_name}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
