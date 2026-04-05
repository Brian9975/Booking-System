import type React from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";





export default function ProtectedRoute({children}: {children: React.ReactNode}) {
const {user, loading} = useAuth()
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
    <div>

    <h1>Hello World</h1>
    <main>{children}</main>
    </div>
  )
}
