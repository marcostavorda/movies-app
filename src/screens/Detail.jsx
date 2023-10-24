import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader';
import { ConfigFile } from '../config/ConfigFile';

function Detail({ language }) {

  const [movieData, setMovieData] = useState(null);
  const [text, setText] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ConfigFile.apiToken
      }
    };

    fetch(`${ConfigFile.detailUrl}${movieId}?language=${language}`, options)
      .then(response => {
        return response.status == 200 ? response.json() :
          setText('Se obtuvo respuesta ' + response.status + ' para la película con id ' + movieId)
      })
      .then(data => setMovieData(data))
      .catch(err => setText('Error: ' + err));
  }, [language]);

  if (text) {
    return (<p>{text}</p>)
  }
  return (
    <>{movieData ? (<MovieCard movieData={movieData} />) : <Loader />}</>
  )
}

export default Detail