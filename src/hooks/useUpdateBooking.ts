import { doc, updateDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { db } from "../lib/firebase-config"


export default function useUpdateBooking() {
  const {user} = useAuth()

    const updateBooking = async (id:string) => {
     const userId = user!.uid
    const docRef = doc(db, "bookings", userId, "bookings", id)
     

    try {
        await updateDoc(docRef, {
            status: "Done"
        })
        alert("Booking status updated successfully")
    } catch (error) {
        alert(`An Error occured while updating booking.Please try again. "${error}"`)
    }


    }
  return {updateBooking}
}
