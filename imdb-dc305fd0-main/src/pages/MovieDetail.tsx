import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getMovieDetail } from "@/api/api";
import { Star, Clock, Film, Calendar } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) throw new Error("Movie ID not found");
        const movieId = parseInt(id);
        const movieData = await getMovieDetail(movieId);

        if (!movieData?.data?.[0]) {
          console.warn("[MovieDetail] No valid movie data returned");
        }

        setMovie(movieData.data[0]);
      } catch (error) {
        console.error("[MovieDetail] Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

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

  if (!movie) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie not found</h2>
          <p className="text-muted-foreground mb-8">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button className="bg-pink hover:bg-pink/80">Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="absolute inset-0 h-[500px] md:h-[600px] overflow-hidden">
          <img
            src={`/${movie.poster}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-background"></div>
        </div>

        <div className="relative pt-40 pb-12 md:pt-48 md:pb-16 container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={`/${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-2/3 lg:w-3/4 flex flex-col">
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.categories?.filter(Boolean).map((category: any) => (
                  <Link
                    key={category.cat_code}
                    to={`/category/${category.cat_code}`}
                    className="category-badge"
                    style={{
                      backgroundColor: `${category.cat_color}30`,
                      color: category.cat_color,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category.cat_name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-pink mr-1" fill="#FF90BB" />
                  <span className="font-semibold text-white">{movie.rate}/10</span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-burgundy text-xs font-medium rounded text-white">
                    {movie.age_rate}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">
                    {Math.floor(movie.time / 60)}h {movie.time % 60}m
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">
                    {new Date(movie.release_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Film className="w-4 h-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">
                    Metascore: {movie.metascore}
                  </span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">{movie.summary}</p>

              <div className="flex flex-wrap gap-3 mt-2 mb-8">
                <Button
                  className="bg-pink hover:bg-pink/80 text-white"
                  onClick={() => setShowTrailer(true)}
                >
                  Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-12 right-0 text-white border-white hover:bg-white/20"
              onClick={() => setShowTrailer(false)}
            >
              <span className="sr-only">Close</span>
              <span aria-hidden="true" className="text-2xl">
                &times;
              </span>
            </Button>
            <div className="aspect-video w-full">
              <iframe
                src={movie.trailer}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Cast Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
          Cast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movie.actors?.filter(Boolean).map((actor: any) => (
            <div key={actor.actor_id} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-3 mx-auto">
                <img
                  src={`https://biydaaltbackends.vercel.app/${actor.image}`}
                  alt={`${actor.fname} ${actor.lname}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-white">
                {actor.fname} {actor.lname}
              </h3>
              <p className="text-sm text-muted-foreground">{actor.char_name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photos Section */}
      {movie.content?.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
            Photos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movie.content.filter(Boolean).map((content: any) => (
              <div key={content.id || content.img} className="rounded-lg overflow-hidden">
                <img
                  src={`/${content.img}`}
                  alt={`${movie.title} - Photo`}
                  className="w-full h-full object-cover aspect-video"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default MovieDetail;
