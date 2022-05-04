import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Notiflix from 'notiflix';

function Register() {
  const [data, setData] = useState({
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      mobile_number: "",
      dob: "",
      password: "",
      confirmPassword: ""
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState({})
  const handle = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value 
    setData(newdata)
}
  const submit = (e) => {
      e.preventDefault()
      setFormErrors(validate(data))
      setIsSubmit(true)
      if(Object.keys(formErrors).length === 0 && isSubmit) {
        Axios.post("http://127.0.0.1:5000/register",{
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                middle_name: data.middle_name,
                mobile_number: data.mobile_number,
                dob:data.dob       
        })
        .then(resp => {
            if(resp.status === 200) {
                console.log(resp.data)
                Notiflix.Report.success(
                'Success',
                '<h1>' + resp.message + '</h1>',
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
    }
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
    if (!data.first_name) {
        errors.first_name = "First name is required!"
    }
    if (!data.last_name) {
        errors.last_name = "Last name is required!"
    }
    if (!data.dob) {
        errors.dob = "Date of birth is required!"
    }
    if (!data.mobile_number) {
        errors.mobile_number = "Mobile number is required!"
    }
    if (!data.password) {
        errors.password = "Password is required!"
    }
    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
    }
    else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Please re-enter your password correctly"
        if (!data.password && data.confirmPassword) {
            errors.confirmPassword = "Please enter password and confirm password"
        }
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
              <p className="text-white mt-1">The most popular app</p>
              <div className="flex justify-center lg:justify-start mt-6">
                  <Link className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2" to="/">Get Started</Link>
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 py-4 overflow-scroll">
            <div className="w-full px-8 md:px-32 lg:px-24 mt-5 py-12">
            <form className="bg-white rounded-md shadow-2xl p-5 mt-12" onSubmit={(e) => submit(e)} >
              <h1 className="text-gray-800 font-bold text-2xl my-2">Hello!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Become a member</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input onChange={(e) => handle(e)} id="email" className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.email}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                </svg>
                <input onChange={(e) => handle(e)} id="first_name" className="pl-2 w-full outline-none border-none" type="text" name="first_name" placeholder="First Name" />
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.first_name}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                </svg>
                <input onChange={(e) => handle(e)} id="last_name" className="pl-2 w-full outline-none border-none" type="text" name="last_name" placeholder="Last Name" />
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.last_name}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                </svg>
                <input onChange={(e) => handle(e)} id="middle_name" className="pl-2 w-full outline-none border-none" type="text" name="middle_name" placeholder="Middle Name" />
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.middle_name}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                </svg>
                <input onChange={(e) => handle(e)} id="dob" className="pl-2 w-full outline-none border-none" type="date" name="dob"/>
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.dob}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
                </svg>
                <input onChange={(e) => handle(e)} id="mobile_number" className="pl-2 w-full outline-none border-none" type="tel" name="mobile_number" placeholder="Mobile Number" />
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.mobile_number}</p>
              
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input onChange={(e) => handle(e)} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
                
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-3">{formErrors.password}</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input onChange={(e) => handle(e)} className="pl-2 w-full outline-none border-none" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" /> 
              </div>
              <p className="text-red-600 italic px-2 mt-1 mb-8">{formErrors.confirmPassword}</p>
              <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Register</button>
              <div className="flex justify-end mt-4">
                <Link className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all" to="/login">Already have an account?</Link>
              </div>
            </form>
            </div>
            
          </div>
      </div>
    </>
  )
}

export default Register
