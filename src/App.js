
import { useEffect, useState } from 'react';
import './App.css';
import { addToFavorites, removeFromFavorites } from './Redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Favorites from './Components/Favorites.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from './Components/MovieList';



function App() {
  
  return (
    <div className="App">
    
    <Routes>
        <Route path='/' element={<MovieList />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
