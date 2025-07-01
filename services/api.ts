export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3/",
    api_key:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers :{
        accept: 'application/json',
        Authoriziation: `BEARER ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query} : {query : string}) => {
    const endpoint = query 
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method:'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok){
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
}

//これは削除すべきかどうなのか
function async(arg0: { query: any }) {
    throw new Error("Function not implemented.")
}
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