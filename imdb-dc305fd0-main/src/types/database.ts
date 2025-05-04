
export interface Movie {
  movie_id: number;
  title: string;
  summary: string;
  poster: string;
  trailer: string;
  release_date: string;
  age_rate: string;
  time: number; // in minutes
  rate: number;
  metascore: number;
}

export interface Category {
  cat_code: string;
  cat_name: string;
  cat_color: string;
  cat_desc: string;
}

export interface CategoryMovie {
  id: number;
  movie_id: number;
  cat_code: string;
}

export interface Actor {
  actor_id: number;
  image: string;
  fname: string;
  lname: string;
}

export interface ActorRelation {
  id: number;
  movie_id: number;
  actor_id: number;
  char_name: string;
}

export interface MovieContent {
  id: number;
  movie_id: number;
  img: string;
}

// Extended types with relationships
export interface MovieWithDetails extends Movie {
  categories?: Category[];
  actors?: (Actor & { char_name: string })[];
  content?: MovieContent[];
}
