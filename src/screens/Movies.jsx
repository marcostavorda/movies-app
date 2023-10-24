import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import Pager from '../components/Pager';
import { ConfigFile } from '../config/ConfigFile';

function Movies({ language, type, url }) {

  const [movies, setMovies] = useState(null);
  const [text, setText] = useState(null);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const { movieId } = useParams();
  const { categoryId } = useParams();
  const { categoryName } = useParams();
  const { searchText } = useParams();

  const itemsPage = 20;

  useEffect(() => {
    let params = `?language=${language}&page=${page}`;
    switch (type) {
      case 'similares': {
        url = url.replace("{movieId}", movieId);
        break;
      }
      case 'en categoría':
        params = params + `&include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=${categoryId}`;
        break;
      case 'resultados':
        params = params + `&query=${searchText}&include_adult=false`;
        break;
    }
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ConfigFile.apiToken
      }
    };

    fetch(`${url}${params}`, options)
      .then(response => {
        return response.status == 200 ? response.json() :
          setText('Se obtuvo respuesta de tipo ' + response.status + ' al buscar ' + type)
      })
      .then(data => setMovies(data))
      .catch(err => setText('Error: ' + err));
  }, [language, url, page, categoryId, searchText]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    storedFavorites && setFavorites(storedFavorites);
  }, []);

  const title = !movies ? '' : `${movies.total_results} ${type} ` + (categoryName ? ` ${categoryName}` : '') +
    (searchText ? ` para "${searchText}"` : '');

  const showMovies = !movies ? [] : movies.results;

  if (text) { return (<p className="text-center">{text}</p>) }
  if (!movies) { return (<Loader />); }
  return (
    <Pager title={title} movies={showMovies} itemsPage={itemsPage} page={page} setPage={setPage}
       totalPages = {movies.total_pages} favorites={favorites} setFavorites={setFavorites} />
  )
}

export default Movies