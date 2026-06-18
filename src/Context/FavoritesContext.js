// import { createContext, useState, useEffect } from "react";

// export let FavoritesContext = createContext();

// export default function FavoritesProvider({ children }) {

//   function getUserKey() {
//     let email = localStorage.getItem('userEmail');
//     return `favorites_${email}`;
//   }

//   function getInitialFavorites() {
//     try {
//       let saved = localStorage.getItem(getUserKey());
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   }

//   let [favorites, setFavorites] = useState(getInitialFavorites);

//   useEffect(() => {
//     localStorage.setItem(getUserKey(), JSON.stringify(favorites));
//   }, [favorites]);

//   function addToFavorites(movie) {
//     let exists = favorites.find(m => m.id === movie.id);
//     if (!exists) {
//       setFavorites([...favorites, movie]);
//     }
//   }

//   function removeFromFavorites(id) {
//     setFavorites(favorites.filter(m => m.id !== id));
//   }

//   return (
//     <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// }
import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {

  function getUserKey() {
    const email = localStorage.getItem("userEmail");
    return email ? `favorites_${email}` : "favorites_guest";
  }

  function getInitialFavorites() {
    try {
      const saved = localStorage.getItem(getUserKey());
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  const [favorites, setFavorites] = useState(getInitialFavorites);

  

  useEffect(() => {
    localStorage.setItem(getUserKey(), JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(movie) {
    const exists = favorites.find(fav => fav.id === movie.id);
    if (!exists) {
      setFavorites([...favorites, movie]);
    }
  }

  function removeFromFavorites(id) {
    setFavorites(favorites.filter(movie => movie.id !== id));
  }

  // ✅ بنعمل reload للمفضلة لما اليوزر يلوج إن
  function loadUserFavorites() {
    setFavorites(getInitialFavorites());
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, clearFavorites, loadUserFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}