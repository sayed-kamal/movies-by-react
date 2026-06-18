// import React, { useContext } from 'react'
// import style from './Details.module.css'
// import { useParams } from 'react-router-dom'
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { FavoritesContext } from '../../Context/FavoritesContext';

// export default function Details() {
//   let { id } = useParams();
//   let { addToFavorites, favorites } = useContext(FavoritesContext);

//   function getData() {
//     return axios.get
//     (`https://api.themoviedb.org/3/movie/${id}?api_key=c33d69def5d831c729fae579ba7a9225`)
//   }

//   let { data, isLoading } = useQuery({
//     queryKey: ['Details', id],
//     queryFn: getData
//   });

//   let isInFavorites = favorites.find(m => m.id === data?.data?.id); // ✅ عشان تعرف هو مضاف ولا لأ

//   return (
//     <div className="container">
//       {isLoading ? (
//         <div className="text-center mt-5 fs-1">
//           <i className='fas fa-spinner fa-spin'></i>
//         </div>
//       ) : (
//         <div className="d-flex align-items-center justify-content-evenly g-2 p-3">
//           <img className={`${style.img} object-fit-contain flex-shrink-1 me-4 border border-2 rounded`}
//             src={`https://image.tmdb.org/t/p/original${data?.data?.poster_path}`} alt="" />
//           <div className="information w-100">
//             <h1 className="h3">Title: {data?.data?.original_title}</h1>
//             <p>{data?.data?.overview}</p>
//             <button
//               onClick={() => addToFavorites(data?.data)}
//               disabled={isInFavorites} // ✅ مش هيضيف تاني لو موجود
//               className='btn w-100 p-3 bg-secondary-subtle'>
//               {isInFavorites ? '✅ Already in Favorites' : 'Add to Favorites'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useContext } from 'react'
import style from './Details.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FavoritesContext } from '../../Context/FavoritesContext';

export default function Details() {

  const { id } = useParams();

  const {
    addToFavorites,
    favorites
  } = useContext(FavoritesContext);

  function getData() {
    return axios.get(
`https://api.themoviedb.org/3/movie/${id}?api_key=c33d69def5d831c729fae579ba7a9225`
    );
  }

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['Details', id],
    queryFn: getData,
    // staleTime: 1000 * 60 * 5
  });
console.log(error);
  const movie = data?.data;

  const isInFavorites =
    favorites.some(
      item => item.id === movie?.id
    );

  if (isLoading) {
    return (
      <div className='text-center fs-1 mt-5'>
        <i className='fas fa-spinner fa-spin'></i>
      </div>
    );
  }

  if (isError) {
    return <h2>Error Loading Movie</h2>
  }

  return (

    <div className="container">

      <div className="d-flex align-items-center p-3">

        <img
          className={`${style.img} me-4 rounded`}
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt={movie?.title}
        />

        <div>

          <h2>{movie?.title}</h2>

          <p>{movie?.overview}</p>

          <button
            disabled={isInFavorites}
            className='btn btn-secondary w-100'
            onClick={() =>
              addToFavorites(movie)
            }
          >

            {
              isInFavorites
              ? "Already Added"
              : "Add To Favorites"
            }

          </button>

        </div>

      </div>

    </div>
  );
}