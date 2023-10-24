import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './screens/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Movies from './screens/Movies';
import Favorites from './screens/Favorites';
import Detail from './screens/Detail';
import NotFound from './screens/NotFound';
import { ConfigFile } from './config/ConfigFile';

function App() {

  const [lightTheme, setLightTheme] = useState(true);
  const [language, setLanguage] = useState('es-ES');

  const backGroundColor = lightTheme ? '' : '';
  const itemColor = lightTheme ? '' : '';


  return (
    <BrowserRouter>
      <Navbar language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path='/' element={<Home language={language}/>} />
        <Route path='/playing' element={<Movies language={language} type={'novedades'} url={ConfigFile.playingUrl} />} />
        <Route path='/trending/' element={<Movies language={language} type={'tendencias'} url={ConfigFile.trendingUrl} />} />
        <Route path='/upcoming/' element={<Movies language={language} type={'estrenos'} url={ConfigFile.upcomingUrl} />} />
        <Route path='/similar/:movieId' element={<Movies language={language} type={'similares'} url={ConfigFile.similarUrl} />} />
        <Route path='category/:categoryId&:categoryName' element={<Movies language={language} type={'en categoría'} url={ConfigFile.discoverUrl} />} />
        <Route path='/favorites' element={<Favorites language={language} />} />
        <Route path='/detail/:movieId' element={<Detail language={language} />} />
        <Route path='/results/:searchText' element={<Movies language={language} type={'resultados'} url={ConfigFile.searchUrl} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
