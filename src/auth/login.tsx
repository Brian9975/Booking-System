

import { useEffect, useState } from "react";
import GoogleLogo from "../assets/Google.png"
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingsContext";
import useHandleLogin from "../hooks/useHandleLogin";
import {  useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";





export default function Login() {

const {handleLogin, logWithGoogle, setEmail, setPassword} = useHandleLogin()
const {loggedIn, setLoggedIn, loadingOnAct} = useBookings()
const {user, loading} = useAuth()
const navigate = useNavigate()
const [showPassword, setShowPassword] = useState(false)




useEffect(() => {
 if (user && !loading) {
  navigate("/customers")
 }
}, [user, loading, navigate])

if (loading) {
  return <div className="bg-blue-300 h-screen gap-1 inset-0 fixed flex justify-center items-center flex-col">
    <Spinner className="size-15"/>
      
   </div>
}

if (loadingOnAct) {
  return <div className="bg-blue-300 h-screen gap-1 inset-0 fixed flex justify-center items-center flex-col">
      <Spinner className="size-15"/>
        
     </div>
}

if (user) {
  return null
}



  return <div className="bg-linear-to-b from-blue-500 from-10% to-lime-300 to-90% min-h-screen ">

<div className="mb-7 text-center pt-5">
  <h1 className="text-center text-3xl sm:text-lg font-bold px-2">Welcome To Your Booking Manager.</h1>
  <p className="my-5 text-sm md:text-md"> Where All Your Customers And Bookings Are Managed Simply in one Place.Please Login or Sign Up to get started.</p>

  <p></p>
</div>
    <div className="flex justify-center items-center">
    
   
    <div className="bg-blue-100 rounded-lg p-4 md:w-100 text-center">

       <h1 className="font-bold text-2xl">{loggedIn ? "Login" : "Sign Up"}</h1>
    <form onSubmit={handleLogin} className="mb-5">
     <div>
      <div className="text-left mb-1 mt-4">
     <label className="font-bold">Email</label></div>
     <input onChange={(e) => setEmail(e.target.value)} className="border ring w-full mb-5 rounded placeholder-gray-600 px-2 py-1" type="email" placeholder="Email" required />
     </div>
       <div> 
      <div className="text-left  mb-1">
     <label className="font-bold">Password</label></div>
     <div className="relative mb-5">
     <input onChange={e => setPassword(e.target.value)} className="border ring w-full placeholder-gray-600 rounded px-2  py-1" type={`${showPassword ? "text" : "password"}`} placeholder="Password" required/>
     <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute cursor-pointer hover:opacity-70 right-1 top-1/2 -translate-y-1/2">
      {showPassword ? <Eye/> : <EyeOff/>}
     </button>
     </div>
     </div>
     <button className="cursor-pointer w-full py-1 bg-blue-800 text-white rounded px-2">{loggedIn ? "Login" : "Create Account"}</button>
    </form>
        <p className="text-sm font-extrabold">
        {loggedIn ? "Don't have an account?" : "Already have an account?"} 
        <button 
          onClick={() => setLoggedIn(!loggedIn)} 
          className="text-blue-800 ml-2 underline cursor-pointer"
        >
          {loggedIn ? 'Sign Up' : 'Login'}
        </button>
      </p>
    <hr className="my-4"/>
    <p>or</p>
    <div>
      <button onClick={logWithGoogle} className="cursor-pointer px-2 py-1  w-full rounded shadow-lg flex justify-center items-center gap-3 mt-2 bg-linear-to-b from-blue-200 from-10% to-lime-200 to-90%"><div><img className="w-5" src={GoogleLogo} alt="Google Logo" /></div><div>Continue With Google</div></button>
    </div>
    </div>
    </div>
    <Toaster/>
  </div>;
}
