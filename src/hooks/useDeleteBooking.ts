
import { deleteDoc, doc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

import {db} from "../lib/firebase-config"

export default function useDeleteBooking() {

const {user} = useAuth()


  const deleteBooking = async (id: string) => {
    const userId = user!.uid
    const docRef = doc(db, "bookings", userId, "bookings", id)

    try{
     await deleteDoc(docRef);
     alert("Booking deleted successfully")
    } catch(error) {
      alert(`Failed to delete booking. ${error}`)
    }

    
  }


  return {deleteBooking}
}
