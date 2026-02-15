const API_BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGZjYjIxMDU4ODdmNWRjZTdjZWE2YWI2NGJjZmY0MyIsIm5iZiI6MTcwMjYzMTQ1Ny43NjgsInN1YiI6IjY1N2MxODIxNTY0ZWM3MDBjNDc1N2E1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.porPLePkb49FXMZRoun7OREpFxCF68nxMeq7z2cFbGo";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

export async function fetchGenreList() {
  const response = await fetch(
    `${API_BASE_URL}/genre/movie/list?language=fr-FR`,
    options
  );
  const data = await response.json();
  return data.genres;
}

export async function fetchMoviesByGenre(genreId: number) {
  const response = await fetch(
    `${API_BASE_URL}/discover/movie?with_genres=${genreId}&language=fr-FR&sort_by=popularity.desc`,
    options
  );
  return response.json();
}

export const fetchMovieTrailer = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}/videos?language=fr-FR`,
    options
  );
  const data = await response.json();
  
  // On cherche une vidéo de type 'Trailer' sur 'YouTube'
  const trailer = data.results.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  console.log(trailer);
  
  // On renvoie l'URL complète
  return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : null;
};