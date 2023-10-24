import { useState } from "react";

import MovieList from '../components/MovieList'
import Filter from '../components/Filter';

function Pager(props) {

    const [findText, setFindText] = useState('');
    const [min, setMin] = useState(0);    
    const [max, setMax] = useState(props.itemsPage);
    
    /*Permite paginar según la cantidad de items en memoria  y luego cambiar de página*/

    const hasNextItems = () => {
        if(props.movies && max < props.movies.length){
            return true;
        }
        return false;
    }

    const hasNextPages = () => {
        if(props.movies && props.page && props.totalPages > props.page){
            return true;
        }
        return false;
    }
    
    const handleNextChange = () => {
        if(hasNextItems()){
            setMin(min + props.itemsPage);
            setMax(max + props.itemsPage);
        }
        else{
            setMin(0);
            setMax(props.itemsPage);
            if(hasNextPages()){
                props.setPage(props.page + 1);
            }
        }
    }

    const hasPreviousItems = () => {
        if(props.movies){
            return min - props.itemsPage;
        }
        return -1;
    }

    const hasPreviousPages = () => {
        if(props.movies && props.page){
            return props.page - 1;
        }
        return -1;
    }
    const handlePreviousChange = () => {  
        if(hasPreviousItems() >= 0){
            setMin(min - props.itemsPage);
            setMax(max - props.itemsPage);
        }
        else{
            
            if(hasPreviousPages() >= 0){
                if(props.movies){
                    const remainingItems = props.movies.length - props.itemsPage;
                    setMin(props.movies.length - remainingItems);
                    setMax(props.movies.length - remainingItems + props.itemsPage);
                }
                props.setPage(props.page - 1);
                
            }
        }
    }

    const showMovies = props.movies.slice(min, max);
    const filteredMovies = !showMovies ? [] : showMovies.filter((movie) => movie.title ? (movie.title.toLowerCase().includes(findText.toLowerCase())) : '' );

    return (
        <section>
            <h3 className='text-center font-bold text-lg bg-emerald-50'>{props.title}</h3>
            <Filter findText={findText} setFindText={setFindText} />
            {filteredMovies.length > 0 ? (<>
                <MovieList movies={filteredMovies} favorites={props.favorites} setFavorites={props.setFavorites} removeFavorite={props.removeFavorite} />
            </>
            ) : ''}
            {(hasPreviousItems() >= 0 || hasPreviousPages() > 0) ?
                <button className="btn btn-primary" onClick={handlePreviousChange}>Anterior</button>
                : ''}
            {(hasNextItems() || hasNextPages()) ?
                <button className="btn btn-primary" onClick={handleNextChange}>Siguiente</button>
                : ''}
        </section>
    )
}

export default Pager;