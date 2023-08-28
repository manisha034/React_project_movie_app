
import { useEffect, useState } from 'react';
import './App.css';
import { addToFavorites, removeFromFavorites } from './Redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Favorites from './Components/Favorites.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieList from './Components/MovieList';



function App() {

  const [movies, setMovies]=useState([])
  const navigate = useNavigate()
  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch(); 

  const moviesList ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=edca993d7c8e2287af01d26d7b0b043e&page=1'

  const image_path='https://image.tmdb.org/t/p/w1280'

  const searchList ='https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=edca993d7c8e2287af01d26d7b0b043e&query='

  useEffect(()=>{
    
      fetch(moviesList)
      .then(res=>res.json()).then(data=>{
       setMovies(data.results)
      })
    }

  ,[])

  const handleAddToFavorites = (movie) => {
    dispatch(addToFavorites(movie));
  };

  const handleRemoveFromFavorites = (movieID) => {
    dispatch(removeFromFavorites(movieID));
  };


  const handleChange = (val)=>{
    fetch(`${searchList}`+val)
      .then(res=>res.json()).then(data=>{
       setMovies(data.results)
      })
  }

  const [favourites, setFavourites] = useState([])

  const addFavMovie =(movie)=>{
    const newFavList=[...favourites,movie]
    console.log(newFavList)
  }

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
