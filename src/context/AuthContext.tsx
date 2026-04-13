import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase-config'
import { toast } from 'sonner'




interface AuthContextType {
 user: User | null,
 loading: boolean,
 setLoading: React.Dispatch<React.SetStateAction<boolean>>,
 logout: () => Promise<void>
}
 
const AuthContext = createContext<AuthContextType | undefined>(undefined)
export default function AuthContextProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    
    
    
    

   const logout = async () => {
    setLoading(true)
     try {
        await signOut(auth)
        
     } catch (error) {
        toast.error(`An Error Occured while Logging Out!! ${error}`, {position: "top-center"})
     } finally{
       setLoading(false)
     }
   }


    const contextValues = {user, loading, setLoading, logout}

    useEffect(() => {
     const unsubscribe = onAuthStateChanged((auth),  (userInfo) => {
       setUser(userInfo)
       setLoading(false)
     })
      
      
     return () => unsubscribe()
    }, [])
  return <AuthContext value={contextValues}>{children}</AuthContext>

}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within AuthContextProvider")
    }


    return context
}
