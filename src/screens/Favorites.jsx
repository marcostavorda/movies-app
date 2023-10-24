import { useState, useEffect } from "react";
import { ConfigFile } from '../config/ConfigFile';

import Loader from '../components/Loader';
import Pager from '../components/Pager';

function Favorites({ language }) {

    const itemsPage = 20;

    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [text, setText] = useState(null);


    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ConfigFile.apiToken
            }
        };
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (storedFavorites.length > 0) {
            Promise.all(
                storedFavorites.map((id) =>
                    fetch(`${ConfigFile.detailUrl}${id}?language=${language}`, options)
                        .then((res) => res.json())
                )
            ).then((data) => setFavoriteMovies(data))
                .catch((error) => setText('Error' + error));
            setFavorites(storedFavorites);
        }
    }, [language]);

    const removeFavorite = (movieId) => {
        const updatedFavorites = favorites.filter((id) => id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavoriteMovies(favoriteMovies.filter((movie) => `${movie.id}` !== movieId));
    }

    if (text) { return (<p className="text-center">{text}</p>); }
    if (!favoriteMovies) { return (<Loader />); }
    return (
        <Pager title={`${favorites.length} Favoritos`} movies={favoriteMovies} itemsPage={itemsPage}
         favorites={favorites} setFavorites={setFavorites} removeFavorite={removeFavorite} />
    )
}

export default Favorites 