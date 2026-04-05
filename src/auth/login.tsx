

import { useEffect } from "react";
import GoogleLogo from "../assets/Google.png"
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingsContext";
import useHandleLogin from "../hooks/useHandleLogin";
import {  useNavigate } from "react-router-dom";





export default function Login() {

const {handleLogin, logWithGoogle, setEmail, setPassword} = useHandleLogin()
const {loggedIn, setLoggedIn} = useBookings()
const {user, loading} = useAuth()
const navigate = useNavigate()




useEffect(() => {
 if (user) {
  navigate("/customers")
 }
}, [user, loading, navigate])

if (loading) {
  return <div className="text-2xl">Loading...</div>
}

if (user) {
  return null
}



  return <div className="bg-gradient-to-b from-blue-500 from-10% to-lime-300 to-90% min-h-screen flex justify-center items-center">
   
    <div className="bg-blue-100 rounded-lg p-4 md:w-100 text-center">

       <h1 className="font-bold text-2xl">{loggedIn ? "Login" : "Sign Up"}</h1>
    <form onSubmit={handleLogin} className="mb-5">
     <div>
     <input onChange={(e) => setEmail(e.target.value)} className="border ring w-full my-5 rounded placeholder-gray-600 px-2 py-1" type="email" placeholder="Email"/>
     </div>
       <div>
     <input onChange={e => setPassword(e.target.value)} className="border ring w-full placeholder-gray-600 my-5 rounded px-2 py-1" type="password" placeholder="Password"/>
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
      <button onClick={logWithGoogle} className="cursor-pointer px-2 py-1  w-full rounded shadow-lg flex justify-center items-center gap-3 mt-2 bg-gradient-to-b from-blue-200 from-10% to-lime-200 to-90%"><div><img className="w-5" src={GoogleLogo} alt="Google Logo" /></div><div>Sign In With Google</div></button>
    </div>
    </div>
  </div>;
}
