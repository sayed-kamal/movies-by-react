import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { HandelNavpar } from '../../Context/HandelNavpar';
import { FavoritesContext } from '../../Context/FavoritesContext';

export default function Login() {
  let { setHandelNavpar } = useContext(HandelNavpar);
   let { loadUserFavorites } = useContext(FavoritesContext);
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][\w @]{0,9}$/, 'password not invalid EX:Ahmed@123'),
  });

  function loginNow(values) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let matchedUser = users.find(user =>
      user.email === values.email && user.password === values.password
    );

    if (matchedUser) {
      localStorage.setItem('token', 'userLogged');
      localStorage.setItem('userEmail', matchedUser.email); // ✅ مهم للمفضلة
      loadUserFavorites();
      setHandelNavpar(true);
      navigate('/home');
    } else {
      alert('email or password not correct');
    }
  }

  let formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: loginNow
  });

  return (
    <div className="w-75 p-2 m-auto">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">email :</label>
        <input value={formik.values.email} onBlur={formik.handleBlur}
          onChange={formik.handleChange} className='w-100'
          type="email" name="email" id="email" />
        {formik.errors.email && formik.touched.email &&
          <div className='alert alert-danger p-2'>{formik.errors.email}</div>}

        <label className='w-100 mt-3' htmlFor="password">password :</label>
        <input value={formik.values.password} onBlur={formik.handleBlur}
          onChange={formik.handleChange} className='w-100'
          type="password" name="password" id="password" />
        {formik.errors.password && formik.touched.password &&
          <div className='alert alert-danger py-2'>{formik.errors.password}</div>}

        <div className="buttons d-flex g-4 mt-3">
          <button className='me-3 btn btn-success' type="submit">Submit</button>
          <Link className='btn btn-info' to={'/register'}>Register Now</Link>
        </div>

      </form>
    </div>
  );
}