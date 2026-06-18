import React from 'react'
import style from './LayOut.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';



export default function LayOut() {
  return <>
  <Navbar/>
<Outlet></Outlet>
  {/* <Footer/> */}
  </>
}
