export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
};

export const fetchMovies = async ({ query }: { query: string }) => {
  // .envファイルからAPIキーを読み込む
  const apiKey = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

  // APIキーが設定されていない場合はエラーを投げる
  if (!apiKey) {
    throw new Error("API key is not configured in your .env file.");
  }

  // クエリの有無でリクエストするURLの基本部分を決める
  const baseEndpoint = query
    ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;

  // URLの末尾にAPIキーを正しく追加する
  const separator = baseEndpoint.includes('?') ? '&' : '?';
  const endpoint = `${baseEndpoint}${separator}api_key=${apiKey}`;

  // データを取得する
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  // レスポンスが正常でない場合はエラーを投げる
  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw new Error(`Failed to fetch movies: ${errorData.status_message || response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};


export const fetchMoviedetails = async (movieId: string): Promise<MovieDetails> => {
  // .envファイルからAPIキーを読み込む
  const apiKey = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

  if (!apiKey) {
    throw new Error("API key is not configured in your .env file.");
  }

  const endpoint = `${TMDB_CONFIG.BASE_URL}movie/${movieId}?api_key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch movie details');

  const data = await response.json();

  return data;
};

//const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
//const options = {
 // method: 'GET',
  //headers: {
   // accept: 'application/json',
    //Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDkzYTVhY2VlY2EwY2QwMTQzMDliNzhhNzk0OTk0YiIsIm5iZiI6MTc1MTMzNzYyNi40ODMsInN1YiI6IjY4NjM0YTlhMTNiNmYyYWM0NGU2NDg3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nXUWnwrxe0ku2L8osqLaxEMpt-L8JctS4TL-JImPTbU'
  //}
//};

//fetch(url, options)
//  .then(res => res.json())
  //.then(json => console.log(json))
  //.catch(err => console.error(err));