import React from 'react'
import style from './Register.module.css'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  let validationSchema = Yup.object({
    name : Yup.string("name is string")
    .required('name is required')
    .min(3,'min 3 letters')
    .max(10,'max letters 10'),

    email:Yup.string()
    .required('email is required')
    .email('in valid email'),

    password: Yup.string()
    .required('password is required')
    .matches(/^[A-Z][\w @]{0,9}$/, 'password not invalid EX:Ahmed@123'),

    rePassword: Yup.string()
    .required('rePassword is required')
    .oneOf([Yup.ref('password')],'rePassword and password not Equal')
  })

  let navigat = useNavigate()
function registerNow(values) {


// let users = [];
// if(localStorage.getItem('users')){
//   users = JSON.parse(localStorage.getItem('users'))
// }
// users.push(values)
// localStorage.setItem('users',JSON.stringify(users))
  let users =
    JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(
    user => user.email === values.email
  );

  if (exists) {
    alert("Email already exists");
    return;
  }

  users.push(values);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

navigat('/login');
  
 }
  let formik = useFormik({
 
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema,
    onSubmit:registerNow

  })
 
  return <>
  <div className="w-75 p-2 m-auto">
    <h1>Register</h1>
  <form  onSubmit={formik.handleSubmit}>

    <label className='w-100 mt-3' htmlFor="name">name : </label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} 
    className='w-100' type="text" name="name" id="name" />
    {formik.errors.name && formik.touched.name ?
    <div className=' alert alert-danger p-2'>{formik.errors.name}</div>:''}

    <label className='w-100 mt-3' htmlFor="email">email : </label> 
     <input onBlur={formik.handleBlur} onChange={formik.handleChange} 
     className='w-100' type="email" name="email" id="email" />
     {formik.errors.email && formik.touched.email ?
    <div className=' alert alert-danger py-2'>{formik.errors.email}</div>:''}

    <label className='w-100 mt-3' htmlFor="password">password : </label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange}
     className='w-100' type="password" name="password" id="password" />
     {formik.errors.password && formik.touched.password ?
    <div className=' alert alert-danger py-2'>{formik.errors.password}</div>:''}

    <label className='w-100 mt-3' htmlFor="rePassword">rePassword : </label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} 
    className='w-100 ' type="password" name="rePassword" id="rePassword" />
    {formik.errors.rePassword && formik.touched.rePassword ?
    <div className=' alert alert-danger py-2'>{formik.errors.rePassword}</div>:''}
    <button className='w-100 mt-3' type="submit" >Submit</button>

  

  </form>
  </div>
  </>
}
