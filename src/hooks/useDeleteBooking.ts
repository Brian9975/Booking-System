
import { deleteDoc, doc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import {toast} from "sonner"

import {db} from "../lib/firebase-config"

export default function useDeleteBooking() {

const {user} = useAuth()


  const deleteBooking = async (id: string) => {
    const userId = user!.uid
    const docRef = doc(db, "bookings", userId, "bookings", id)

    try{
     await deleteDoc(docRef);
     toast.success("Booking deleted successfully", {position: "top-center"})
    } catch(error) {
      toast.error(`Failed to delete booking. ${error}`, {position: "top-center"})
    }

    
  }


  return {deleteBooking}
}
