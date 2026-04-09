import type { BookingData } from "./bookingData"
import type {CustomerData} from "./customerData"



export interface BookingsContextType {
 loggedIn: boolean,
 setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
 customerData: CustomerData[],
 setCustomerData: React.Dispatch<React.SetStateAction<CustomerData[]>>
 bookingInfo: BookingData[],
 setBookingInfo: React.Dispatch<React.SetStateAction<BookingData[]>>

}