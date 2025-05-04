
import { Movie, Category, Actor, MovieContent, MovieWithDetails } from "../types/database";

export const categories: Category[] = [
  { cat_code: "action", cat_name: "Action", cat_color: "#FF90BB", cat_desc: "Exciting action scenes" },
  { cat_code: "comedy", cat_name: "Comedy", cat_color: "#C68EFD", cat_desc: "Funny and humorous" },
  { cat_code: "drama", cat_name: "Drama", cat_color: "#E9A5F1", cat_desc: "Serious and emotional" },
  { cat_code: "scifi", cat_name: "Sci-Fi", cat_color: "#85193C", cat_desc: "Science fiction" },
  { cat_code: "horror", cat_name: "Horror", cat_color: "#FF90BB", cat_desc: "Scary and suspenseful" }
];

export const movies: Movie[] = [
  {
    movie_id: 1,
    title: "Interstellar",
    summary: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?q=80&w=2670&auto=format&fit=crop",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    release_date: "2014-11-07",
    age_rate: "PG-13",
    time: 169,
    rate: 8.6,
    metascore: 74
  },
  {
    movie_id: 2,
    title: "The Dark Knight",
    summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=2787&auto=format&fit=crop",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    release_date: "2008-07-18",
    age_rate: "PG-13",
    time: 152,
    rate: 9.0,
    metascore: 84
  },
  {
    movie_id: 3,
    title: "Inception",
    summary: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=2787&auto=format&fit=crop",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    release_date: "2010-07-16",
    age_rate: "PG-13",
    time: 148,
    rate: 8.8,
    metascore: 74
  },
  {
    movie_id: 4,
    title: "Pulp Fiction",
    summary: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2425&auto=format&fit=crop",
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    release_date: "1994-10-14",
    age_rate: "R",
    time: 154,
    rate: 8.9,
    metascore: 94
  },
  {
    movie_id: 5,
    title: "The Matrix",
    summary: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    release_date: "1999-03-31",
    age_rate: "R",
    time: 136,
    rate: 8.7,
    metascore: 73
  },
  {
    movie_id: 6,
    title: "Parasite",
    summary: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2459&auto=format&fit=crop",
    trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
    release_date: "2019-10-11",
    age_rate: "R",
    time: 132,
    rate: 8.5,
    metascore: 96
  }
];

export const actors: Actor[] = [
  { actor_id: 1, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop", fname: "Matthew", lname: "McConaughey" },
  { actor_id: 2, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop", fname: "Anne", lname: "Hathaway" },
  { actor_id: 3, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop", fname: "Jessica", lname: "Chastain" },
  { actor_id: 4, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop", fname: "Christian", lname: "Bale" },
  { actor_id: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop", fname: "Heath", lname: "Ledger" },
  { actor_id: 6, image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=2574&auto=format&fit=crop", fname: "Leonardo", lname: "DiCaprio" },
  { actor_id: 7, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2622&auto=format&fit=crop", fname: "Ellen", lname: "Page" },
  { actor_id: 8, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop", fname: "John", lname: "Travolta" },
  { actor_id: 9, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop", fname: "Uma", lname: "Thurman" },
  { actor_id: 10, image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2580&auto=format&fit=crop", fname: "Keanu", lname: "Reeves" }
];

// Movie-Category relationships
export const movieCategories = [
  { id: 1, movie_id: 1, cat_code: "scifi" },
  { id: 2, movie_id: 1, cat_code: "drama" },
  { id: 3, movie_id: 2, cat_code: "action" },
  { id: 4, movie_id: 2, cat_code: "drama" },
  { id: 5, movie_id: 3, cat_code: "scifi" },
  { id: 6, movie_id: 3, cat_code: "action" },
  { id: 7, movie_id: 4, cat_code: "drama" },
  { id: 8, movie_id: 4, cat_code: "comedy" },
  { id: 9, movie_id: 5, cat_code: "scifi" },
  { id: 10, movie_id: 5, cat_code: "action" },
  { id: 11, movie_id: 6, cat_code: "drama" },
  { id: 12, movie_id: 6, cat_code: "comedy" }
];

// Actor-Movie relationships
export const actorRelations = [
  { id: 1, movie_id: 1, actor_id: 1, char_name: "Cooper" },
  { id: 2, movie_id: 1, actor_id: 2, char_name: "Brand" },
  { id: 3, movie_id: 1, actor_id: 3, char_name: "Murph" },
  { id: 4, movie_id: 2, actor_id: 4, char_name: "Bruce Wayne / Batman" },
  { id: 5, movie_id: 2, actor_id: 5, char_name: "Joker" },
  { id: 6, movie_id: 3, actor_id: 6, char_name: "Cobb" },
  { id: 7, movie_id: 3, actor_id: 7, char_name: "Ariadne" },
  { id: 8, movie_id: 4, actor_id: 8, char_name: "Vincent Vega" },
  { id: 9, movie_id: 4, actor_id: 9, char_name: "Mia Wallace" },
  { id: 10, movie_id: 5, actor_id: 10, char_name: "Neo" }
];

// Movie content (images)
export const movieContents = [
  { id: 1, movie_id: 1, img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2722&auto=format&fit=crop" },
  { id: 2, movie_id: 1, img: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2513&auto=format&fit=crop" },
  { id: 3, movie_id: 2, img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2669&auto=format&fit=crop" },
  { id: 4, movie_id: 3, img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2425&auto=format&fit=crop" },
  { id: 5, movie_id: 4, img: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=2671&auto=format&fit=crop" },
  { id: 6, movie_id: 5, img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop" }
];

// Helper function to get movie with all its relationships
export const getMovieWithDetails = (movieId: number): MovieWithDetails | undefined => {
  const movie = movies.find(m => m.movie_id === movieId);
  if (!movie) return undefined;
  
  const movieCats = movieCategories
    .filter(mc => mc.movie_id === movieId)
    .map(mc => categories.find(c => c.cat_code === mc.cat_code))
    .filter((c): c is Category => c !== undefined);
    
  const movieActors = actorRelations
    .filter(ar => ar.movie_id === movieId)
    .map(ar => {
      const actor = actors.find(a => a.actor_id === ar.actor_id);
      return actor ? { ...actor, char_name: ar.char_name } : undefined;
    })
    .filter((a): a is (Actor & { char_name: string }) => a !== undefined);
    
  const content = movieContents.filter(mc => mc.movie_id === movieId);
  
  return {
    ...movie,
    categories: movieCats,
    actors: movieActors,
    content: content
  };
};

// Get all movies with their details
export const getAllMoviesWithDetails = (): MovieWithDetails[] => {
  return movies.map(movie => {
    const details = getMovieWithDetails(movie.movie_id);
    return details || movie;
  });
};

// Get movies by category
export const getMoviesByCategory = (catCode: string): MovieWithDetails[] => {
  const movieIds = movieCategories
    .filter(mc => mc.cat_code === catCode)
    .map(mc => mc.movie_id);
    
  return movieIds
    .map(id => getMovieWithDetails(id))
    .filter((m): m is MovieWithDetails => m !== undefined);
};
