
import { deleteDoc, doc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import {toast} from "sonner"

import {db} from "../lib/firebase-config"
import { useBookings } from '@/context/BookingsContext'

export default function useDeleteBooking() {
const {setLoadingOnAct} = useBookings()
const {user} = useAuth()


  const deleteBooking = async (id: string) => {
    setLoadingOnAct(true)
    const userId = user!.uid
    const docRef = doc(db, "bookings", userId, "bookings", id)

    try{
     await deleteDoc(docRef);
     toast.success("Booking deleted successfully", {position: "top-center"})
    } catch(error) {
      toast.error(`Failed to delete booking. ${error}`, {position: "top-center"})
    } finally{
      setLoadingOnAct(false)
    }

    
  }


  return {deleteBooking}
}
