import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { getMoviesByCategory, getAllCategories } from "@/api/api";

// Type definitions inline instead of import
interface Category {
  cat_id: number | string;
  cat_name: string;
  cat_desc?: string;
  cat_color: string;
  cat_code: string;
}

interface MovieWithDetails {
  movie_id: number | string;
  title: string;
  poster: string;
  rate: number;
  age_rate: string;
  release_date: string;
  categories: Category[];
}

const CategoryPage = () => {
  const { catCode } = useParams<{ catCode: string }>();
  const cat_id = catCode;

  console.log("Resolved cat_id:", cat_id);

  const [movies, setMovies] = useState<MovieWithDetails[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!cat_id) {
        console.warn("No category ID found in URL.");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching categories and movies for cat_id:", cat_id);

        const [categoriesRes, moviesRes] = await Promise.all([
          getAllCategories(),
          getMoviesByCategory(cat_id),
        ]);

        const allCategories: Category[] = categoriesRes.data || [];
        console.log("All categories:", allCategories);
        console.log("cat_id from URL:", cat_id);

        const matchedCategory = allCategories.find(
          (c) => String(c.cat_id) === String(cat_id)
        );

        console.log("Matched category:", matchedCategory);
        console.log("Movies result:", moviesRes.data);

        // Map over movies and ensure required fields are set
        const moviesWithDetails = moviesRes.data.map((movie: any) => ({
          ...movie,
          rate: movie.rate || 0,  // Default to 0 if missing
          age_rate: movie.age_rate || "N/A",  // Default to "N/A" if missing
          release_date: movie.release_date || "Unknown",  // Default to "Unknown" if missing
          categories: movie.categories || [],  // Default to empty array if missing
        }));

        setCategories(allCategories);
        setCategory(matchedCategory || null);
        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Failed to load category or movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [cat_id]);

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
          <Link to="/" className="text-pink hover:text-pink/80 underline">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="py-12" style={{ backgroundColor: `${category.cat_color}20` }}>
        <div className="container mx-auto px-4">
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
            style={{ color: category.cat_color }}
          >
            {category.cat_name} Movies
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {category.cat_desc || ""}
          </p>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="container mx-auto px-4 py-12">
        {movies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-muted-foreground">
              No movies found in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.movie_id}
                movie_id={movie.movie_id}
                title={movie.title}
                  poster={
                    movie.poster?.startsWith("http")
                      ? movie.poster
                      : `http://127.0.0.1:8000/${movie.poster}`
                  }
                rate={movie.rate}
                age_rate={movie.age_rate}
                release_date={movie.release_date}
                categories = {[]}
              />
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
            .filter((c) => String(c.cat_id) !== String(category.cat_id))
            .map((cat) => (
              <Link
                key={cat.cat_id}
                to={`/category/${cat.cat_id}`}
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
