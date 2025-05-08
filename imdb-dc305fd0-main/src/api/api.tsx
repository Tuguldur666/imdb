import axios from 'axios';

const BASE_URL = 'https://biydaaltbackends.vercel.app/apiimdb/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postJson = async (action: string, data: any = {}) => {
  try {
    console.log(`[API DEBUG] Posting JSON: action="${action}" with data=`, data);

    const response = await axiosInstance.post('', {
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

export const postFormData = async (action: string, formData: FormData) => {
  try {
    formData.append('action', action);
    console.log(`[API DEBUG] Posting FormData: action="${action}"`);

    const response = await axios.post(BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(`[API DEBUG] Response from FormData action="${action}":`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`[API ERROR] (${action} - FormData):`, error?.response?.data || error.message);
    throw error;
  }
};

// Specific API calls
export const getAllMovies = () => postJson('get_all_movies');

export const getMoviesByCategory = (cat_id: string) =>
  postJson('get_movies_by_cat', { cat_id });

export const getMovieDetail = (movie_id: string) =>
  postJson('get_movie_detail', { movie_id });


// Specific API calls
if (import.meta.env.DEV) {
  getAllMovies().then((res) => {
    console.log('[DEBUG] getAllMovies() direct call result:', res);
  }).catch((err) => {
    console.error('[DEBUG] getAllMovies() error:', err);
  });
}
