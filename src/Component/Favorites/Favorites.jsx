import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../Context/FavoritesContext';

export default function Favorites() {
  let { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div className="container">
      <h2 className="text-center mt-4">My Favorites ❤️</h2>
      {favorites.length === 0 ? (
        <h4 className="text-center mt-5 text-muted">No Favorites Yet 😔</h4>
      ) : (
        <div className="movies row g-4 mt-3">
          {favorites.map((movie) => (
            <div key={movie.id} className='col-sm-6 col-md-4 col-lg-3 col-xl-2 border border-1 m-1'>
              <Link to={`/details/${movie.id}`}>
                <div className="card pointer border-0 m-0 p-0">
                  <img className='object-fit-contain'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                  <h3 className="title p-2 text-center h5">
                    {movie.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                </div>
              </Link>
              <button
                onClick={() => removeFromFavorites(movie.id)}
                className='m-2 btn btn-danger w-100'>
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}