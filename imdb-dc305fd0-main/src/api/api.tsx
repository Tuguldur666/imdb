import axios from "axios";

const BASE_URL = "https://biydaaltbackends.vercel.app/apiimdb/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiResponse<T> {
  action: string;
  resultCode: number;
  resultMessage: string;
  curdate: string;
  size: number;
  data: T;
}

export const postJson = async <T = any>(action: string, data: Record<string, any> = {}): Promise<ApiResponse<T>> => {
  try {
    console.log(`[API DEBUG] Posting JSON: action="${action}" with data=`, data);

    const response = await axiosInstance.post<ApiResponse<T>>("", {
      action,
      ...data,
    });

    console.log(`[API DEBUG] Response from action="${action}":`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[API ERROR] (${action}):`, error?.response?.data || error.message);
    throw error;
  }
};

export const postFormData = async <T = any>(action: string, formData: FormData): Promise<ApiResponse<T>> => {
  try {
    formData.append("action", action);
    console.log(`[API DEBUG] Posting FormData: action="${action}"`);

    const response = await axios.post<ApiResponse<T>>(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(`[API DEBUG] Response from FormData action="${action}":`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[API ERROR] (${action} - FormData):`, error?.response?.data || error.message);
    throw error;
  }
};

export const getAllMovies = () => postJson<any[]>("get_all_movies");
export const getAllCategories = () => postJson<any[]>("get_all_categories");
export const getMoviesByCategory = (cat_id: string) =>
  postJson<any[]>("get_movies_by_cat", { cat_id });
export const getMovieDetail = (movie_id: string | number) =>
  postJson<any[]>("get_movie_detail", { movie_id: Number(movie_id) });
export const searchMovie = (movie_name: string) => postJson<any[]>("search_movie", { movie_name });