// import React from 'react'
// import style from './ProtectedRout.module.css';
// import { Navigate } from 'react-router-dom';




// export default function ProtectedRout(props) {
//  if (localStorage.getItem('token')) {
//   return props.children
//  } else {
//   return <Navigate to={'/login'} />
//  }
// }

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
 children
}) {

 const token =
  localStorage.getItem("token");

 return token
  ? children
  : <Navigate to="/login" />

}