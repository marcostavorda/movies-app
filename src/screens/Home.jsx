import { useEffect, useState } from 'react';

import MovieList from '../components/MovieList'
import Loader from '../components/Loader';
import { ConfigFile } from '../config/ConfigFile';

function Home({ language }) {

  const [playingMovies, setPlayingMovies] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  const urls = [ConfigFile.playingUrl, ConfigFile.trendingUrl, ConfigFile.upcomingUrl];

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ConfigFile.apiToken
      }
    };
    fetch(`${ConfigFile.playingUrl}?language=${language}&page=${page}`, options)
    .then(response => response.json())
    .then(data => setPlayingMovies(data.results.slice(0, 6)))
    .catch(err => console.error(err));
    fetch(`${ConfigFile.trendingUrl}?language=${language}&page=${page}`, options)
    .then(response => response.json())
    .then(data => setTrendingMovies(data.results.slice(0, 6)))
    .catch(err => console.error(err));
    fetch(`${ConfigFile.upcomingUrl}?language=${language}&page=${page}`, options)
    .then(response => response.json())
    .then(data => setUpcomingMovies(data.results.slice(0, 6)))
    .catch(err => console.error(err));

  }, [language]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    storedFavorites && setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2 className='text-center font-bold text-lg bg-emerald-50'>Novedades</h2>
      {playingMovies && playingMovies.length > 0 ? (<MovieList movies={playingMovies} favorites={favorites} setFavorites={setFavorites} />
      ) : <Loader />}
      <h2 className='text-center font-bold text-lg bg-emerald-50'>Tendencias</h2>
      {trendingMovies && trendingMovies.length > 0 ? (<MovieList movies={trendingMovies} favorites={favorites} setFavorites={setFavorites} />
      ) : <Loader />}
      <h2 className='text-center font-bold text-lg bg-emerald-50'>Próximamente</h2>
      {upcomingMovies && upcomingMovies.length > 0 ? (<MovieList movies={upcomingMovies} favorites={favorites} setFavorites={setFavorites} />
      ) : <Loader />}
    </div>
  )
}

export default Home