import { createContext, useContext, useState, type ReactNode } from "react";



interface BookingsContextType {
 loggedIn: boolean,
 setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,


}
const BookingsContext = createContext<BookingsContextType | undefined>(undefined)
export default function BookingsContextProvider({children}: {children: ReactNode}) {
    const [loggedIn, setLoggedIn] = useState(true)



    const contextValues = {loggedIn, setLoggedIn}
  return <BookingsContext value={contextValues}>{children}</BookingsContext>
}

export const useBookings = () => {
 let context = useContext(BookingsContext)

 if (context === undefined) {
    throw new Error("useBookings must be within BookingsContextProvider")
 }
   return context
}
