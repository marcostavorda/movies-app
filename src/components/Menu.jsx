import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ConfigFile } from '../config/ConfigFile';

function Menu( {language} ) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ConfigFile.apiToken
            }
        };

        fetch(`${ConfigFile.categoriesUrl}?language=${language}`, options)
            .then(response => response.json())
            .then(data => setCategories(data.genres ? data.genres : []))
            .catch(err => console.error(err));
    }, [language]);

    return (
        <ul className="flex gap-4 px-6">
            <li className="btn">
                <Link to="/">Home</Link>
            </li>
            <li className="btn">
                <Link to="/playing">Novedades</Link>
            </li>
            <li className="btn">
                <Link to="/trending">Tendencias</Link>
            </li>
            <li className="btn">
                <Link to="/upcoming">Estrenos</Link>
            </li>
            <li>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn">Categorías</label>
                    <ul  tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {categories.map((category) => (
                            <Link to={`/category/${category.id}&${category.name}`}><li key={category.id}><a>{category.name}</a></li></Link>))}
                    </ul>
                </div>
            </li>
            <li className="btn">
                <Link to="/favorites">Favoritos</Link>
            </li>
        </ul>
    )
}

export default Menu;