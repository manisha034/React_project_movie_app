import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../Redux/action';
export default function MovieList() {
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
      
      <nav class="navbar justify-content-around">
                  <a class="navbar-brand" style={{ 'color': 'white' }}  onClick={() => navigate('/')}>Movies.io</a>
                  <form class="form-inline d-flex">
                      <input class="form-control mr-sm-2" type="search" placeholder="Type here to search.." 
                       onChange={(e)=>handleChange(e.target.value)}
                       aria-label="Search" />
                      {/* <button class="btn my-2 my-sm-0" type="submit" style={{'color':'white'}}>Search</button> */}
                  </form>
                  <button class="button-29 fav-btn" onClick={() => navigate('/favorites')}>My Favorites</button>
              </nav>
  
       <div className='container movie-app'>
          <div className='col-md-12'>
            <div className='row'>
              <h1 className='text-center mb-5 m-5'>Latest Movies</h1>
  
              {movies && movies.length>0 ?
  
                movies.map((movie)=>{
                  return (
  
                    <div class="card m-3" style={{"width": "18rem"}}>
                    
                    <img class="card-img-top" src={`${image_path}/${movie.backdrop_path}`} alt='No Poster'/>
                      <div class="card-body">
                        <div className='movie-details justify-content-between'>
                        <h4 class="card-title">{movie.title}</h4>
                        <p class="card-text">Rating : {movie.vote_average}</p>
                        </div>
                       
                        <p class="card-text">Release date : {movie.release_date}</p>
  
  
                      {favorites.some((fav) => fav.id === movie.id) ? (
                      <button className='fav' onClick={() => handleRemoveFromFavorites(movie.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
  
                      </button>
                    ) : (
                      <button className='fav' onClick={() => handleAddToFavorites(movie)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      </button>
                    )}
  
  
    
                        
                    </div>
                    
                  </div>
  
                  )
                })
                
              :(
              <h2>Loading...</h2>
            )}
  
  
       
            </div>
          </div>
        </div>
       
      </div>
    );
}
