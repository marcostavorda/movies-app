import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConfigFile } from '../config/ConfigFile';

function MovieCard({ movieData }) {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        storedFavorites && setFavorites(storedFavorites);
    }, []);

    const handleFavorite = () => {
        const updatedFavorites = favorites.includes(`${movieData.id}`)
            ? favorites.filter((id) => id != movieData.id)
            : [...favorites, `${movieData.id}`];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        setFavorite(!favorite);
    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><img src={`${ConfigFile.imgSource}${movieData.poster_path}`} alt={movieData.poster_path} /></figure>
            <div className="card-body">
                <h2 className="card-title">{movieData.title}</h2>
                <p>
                    Promedio: <span className='rounded-lg border border-black' >{movieData.vote_average}</span>  -
                    Votos: <span className='rounded-lg border border-black' >{movieData.vote_count}</span>
                </p>
                <h3>Título original: {movieData.original_title} - Lanzamiento: {movieData.release_date}</h3>
                <h4>{movieData.tagline ? `"${movieData.tagline}"` : ''}</h4>
                Lenguaje original: {movieData.original_language}
                <span key={movieData.id}>
                    Géneros: {movieData.genres.length > 0 ? (movieData.genres.map((genre) =>
                        <Link to={`/category/${genre.id}&${genre.name}`}>
                            <span className='rounded-lg border border-black' key={genre.id} >{genre.name}</span>
                        </Link>))
                        : ''}
                </span>
                <p>{movieData.overview}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleFavorite} className="btn btn-primary">
                        {favorites && favorites.includes(`${movieData.id}`) ? '⭐' : '✰'}
                    </button>
                    <button className="btn btn-primary"><Link to={`/similar/${movieData.id}`} >Películas Similares</Link></button>
                </div>
            </div>
        </div>
    );

}
export default MovieCard;