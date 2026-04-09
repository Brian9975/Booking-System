import { createContext, useContext, useState, type ReactNode } from "react";
import type {BookingsContextType} from "../types/bookingsContext"
import type {CustomerData} from "../types/customerData"
import type  {BookingData} from "../types/bookingData"


const BookingsContext = createContext<BookingsContextType | undefined>(undefined)
export default function BookingsContextProvider({children}: {children: ReactNode}) {
    const [loggedIn, setLoggedIn] = useState(true)
    const [customerData, setCustomerData] = useState<CustomerData[]>([])
    const [bookingInfo, setBookingInfo] = useState<BookingData[]>([])



    const contextValues = {loggedIn, setLoggedIn, customerData, setCustomerData, bookingInfo, setBookingInfo}
  return <BookingsContext value={contextValues}>{children}</BookingsContext>
}

export const useBookings = () => {
 let context = useContext(BookingsContext)

 if (context === undefined) {
    throw new Error("useBookings must be within BookingsContextProvider")
 }
   return context
}
