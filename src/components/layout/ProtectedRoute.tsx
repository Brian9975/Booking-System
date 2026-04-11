import type React from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, CalendarCheck, Contact } from "lucide-react";
import { Toaster } from "../ui/sonner";





export default function ProtectedRoute({children}: {children: React.ReactNode}) {
const {user, loading, logout} = useAuth()
const navigate = useNavigate()


useEffect(() => {
  if (!user && !loading) {
   navigate("/login", {replace: true})
  }
}, [user, loading, navigate])


if (loading) {
    return <div className="text-2xl">Loading...</div>
}



if (!user) {
 return null
}
  return (
    <div className="bg-gradient-to-b from-blue-500 from-10% to-lime-300 to-90% min-h-screen">
  {/* Topbar */}
  <div className="bg-blue-200 border-b-2 border-lime-800 shadow-xl items-center justify-between flex py-3 px-2">
    <div> <h1 className="font-extrabold text-lg">C & B System</h1></div>
   <div>
    <div className="bg-lime-300 border flex justify-center items-center rounded-full h-9 w-9">
        <div><p className="font-bold">{user !== null && user.email[0].toUpperCase()}</p></div>
        
    </div>
   </div>
  </div>
    

    <div className="sm:flex h-screen overflow-hidden">
    {/* sidebar */}
    <div className="hidden flex-start sm:block h-screen bg-blue-200 w-60">
        <div className=" flex flex-col items-center p-2">

            <div className="my-3 ">

                <button onClick={() => navigate("/customers")} className="bg-blue-900  my-2 py-2 px-15 cursor-pointer hover:bg-blue-800 text-blue-100 rounded-md" ><div className="flex items-center gap-2 justify-center"><Contact/><div>Customers</div></div></button>
            
            </div>
            <div>
     
                <button onClick={() => navigate("/bookings")} className="bg-blue-900  my-2  px-15 p-2 cursor-pointer hover:bg-blue-800 text-blue-100 rounded-md" ><div className="flex justify-center gap-2 items-center"><CalendarCheck/><div>Bookings</div></div></button>
     
            </div>
        <button onClick={logout} className="bg-lime-300 mt-5 shadow-lg hover:opacity-80 cursor-pointer w-40 p-2 rounded-md"><div className="flex gap-2 justify-center items-center "><LogOut size={20}/><div>Log Out</div></div></button>
        </div>
    </div>

    <main className="p-2 h-screen overflow-y-auto sm:flex-1">{children}</main>
    <Toaster className="z-50"/>
    </div>
    </div>
  )
}
