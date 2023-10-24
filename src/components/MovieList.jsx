import MovieItemCard from './MovieItemCard';

function MovieList( {movies, favorites, setFavorites, removeFavorite} ) {
    return (
        <ul className="flex flex-wrap gap-6">
            {movies.map((movie, index) => <MovieItemCard key={index} movieData={movie} favorites={favorites} setFavorites={setFavorites} removeFavorite={removeFavorite} />)}
        </ul>
    );

}
export default MovieList;