import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfigFile } from '../config/ConfigFile';

function MovieItemCard({ movieData, favorites, setFavorites, removeFavorite }) {

    const [favorite, setFavorite] = useState(false);

    const handleFavorite = () => {
        const updatedFavorites = favorites.includes(`${movieData.id}`)
            ? favorites.filter((id) => id != movieData.id)
            : [...favorites, `${movieData.id}`];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        
        if (removeFavorite && favorites.includes(`${movieData.id}`)) {
            removeFavorite(`${movieData.id}`);
        }

        setFavorite(!favorite);
    }

    return (
        <div className="card card-side w-48 bg-base-100 shadow-xl">
            <div className="grid grid-flow-row auto-rows-max shadow-xl">
                <button onClick={handleFavorite} className="btn btn-primary">
                    {favorites && favorites.includes(`${movieData.id}`) ? '⭐' : '✰'}
                </button>
                <Link to={`/detail/${movieData.id}`}>
                    <figure><img src={`${ConfigFile.imgSource}${movieData.poster_path}`} alt={movieData.poster_path} /></figure>
                    <div className="card-body">
                        <h3 className="card-title">{movieData.title}</h3>
                        <p><span className='rounded-lg border border-black'>{movieData.vote_average}</span> {movieData.release_date}</p>
                        <p>{movieData.overview ? movieData.overview.substring(0, 60) + '...' : ''}</p>

                    </div>
                </Link >
            </div>


        </div>
    );

}
export default MovieItemCard;