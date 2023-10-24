import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import Menu from './Menu';

import searchImage from '../images/lupa.png';

function Navbar({ language, setLanguage }) {

    const [findText, setFindText] = useState('');

    const handleLanguage = (value) => {
        setLanguage(value);
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Logo />
                <a className="btn btn-ghost normal-case text-xl">Movies App</a>
                <Menu language={language}/>
            </div>
            <div className="flex-none gap-2">
                <select className="select select-bordered w-mid max-w-xs" onChange={(e) => handleLanguage(e.target.value)} >
                    <option value='es-ES' defaultValue >Español</option>
                    <option value='en-EN' >English</option>
                </select>
                <form onSubmit={(e) => e.preventDefault()} className="flex">
                    <input
                        onChange={(e) => setFindText(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto"
                    />
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-11 rounded-full">
                            <Link to={`/results/${findText}`}>
                                <img src={searchImage} />
                            </Link>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Navbar