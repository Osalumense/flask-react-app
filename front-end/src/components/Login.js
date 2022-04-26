import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Notiflix from 'notiflix';

function Login() {
  const [data, setData] = useState({
      email: "",
      password: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState({})
  const handle = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value 
    setData(newdata)
    console.log(newdata)
}
  const submit = (e) => {
      e.preventDefault()
      setFormErrors(validate(data))
      setIsSubmit(true)
      Axios.post("http://127.0.0.1:5000/login", 
            {
              email: data.email,
              password: data.password
          })
          .then(resp => {
              if(resp.status === 200) {
                console.log(resp.data)
                Notiflix.Report.success(
                  'Success',
                  '<h1>' + resp.data.message + '</h1>',
                  'Okay',
                );
              }
              else {
                Notiflix.Report.error(
                  'Error',
                  '<h1> An error occurred </h1>',
                  'Error',
                );
              }
          })
          .catch(error => {
            console.error("There was an error!!", error)
          })
      // const opts = {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*"
      //   },
      //   body: JSON.stringify({
      //     "data": data,
      //   })
      // }
      // if(Object.keys(formErrors).length === 0 && isSubmit) {
      //   fetch('http://127.0.0.1:5000/login', opts)
      //   .then(resp => {
      //     if(resp.status === 200) {
      //       Notiflix.Report.info(
      //         'Success',
      //         '<h1>' + resp.data.message + '</h1>',
      //         'Okay',
      //       );
      //     }
      //     else {
      //       Notiflix.Report.info(
      //         'Error',
      //         '<h1> An error occurred </h1>',
      //         'Error',
      //       );
      //     }          
      //   })
      //   .then()
      //   .catch(error => {
      //     console.error("There was an error!!", error)
      //   })
      // }
  }
  
  const validate = (data) => {
  const errors = {}
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  if (!data.email) {
      errors.email = "Email is required!"
  }
  else if(!regex.test(data.email)) {
      errors.email = "This is not a valid email format!"
  }
  if (!data.password) {
      errors.password = "Password is required!"
  }
  return errors;
}
  return (
    <>
      <div className="h-screen flex">
          <div className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center">
            <div 
                  className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
                  >

                  </div>
            <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
              <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
              <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
              <div class="flex justify-center lg:justify-start mt-6">
                  <Link class="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2" to="/">Get Started</Link>
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
            <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={(e) => submit(e)} >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input onChange={(e) => handle(e)} id="email" className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
              </div>
              <p className="text-red-600 italic px-2 mt-2 mb-8">{formErrors.email}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                <input onChange={(e) => handle(e)} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
                
              </div>
              <p className="text-red-600 italic px-2 mt-2 mb-12">{formErrors.password}</p>
              <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
            </form>
            </div>
            
          </div>
      </div>
    </>
  )
}

export default Login