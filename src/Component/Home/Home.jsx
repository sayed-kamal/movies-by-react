import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';



export default function Home() {

  function getData() {
    return axios.get
    ('https://api.themoviedb.org/3/movie/popular?api_key=c33d69def5d831c729fae579ba7a9225')
  }

  let { data, isLoading ,isError } = useQuery({
    queryKey: ['Movies'],
    queryFn: getData
  });
if(isError){
 return <h2>Error Loading Movies</h2>
}else{


  return (
    <div className="Home container">
      {isLoading ? (
        <div className="text-center mt-5 fs-1">
          <i className='fas fa-spinner fa-spin'></i>
        </div>
      ) : (
        <div className="movies row g-4 mt-3">
          {data?.data?.results.map((movie) => (
            <div key={movie.id} className='col-sm-6 col-md-4 col-lg-3 col-xl-2 border border-1 m-1'>
              <Link to={`/details/${movie.id}`}>
                <div className="card pointer border-0 m-0 p-0">
                  <img className='object-fit-contain'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                  <h3 className="title p-2 text-center h5">
                    {movie?.title?.split(" ").splice(0, 2).join(" ")}
                  </h3>
                </div>
              </Link>
              <Link to={`/details/${movie.id}`}>
                <button className='m-2 btn bg-success text-light w-100'>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
}