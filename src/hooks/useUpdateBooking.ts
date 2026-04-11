import { doc, updateDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { db } from "../lib/firebase-config"
import { toast } from "sonner"


export default function useUpdateBooking() {
  const {user} = useAuth()

    const updateBooking = async (id:string) => {
     const userId = user!.uid
    const docRef = doc(db, "bookings", userId, "bookings", id)
     

    try {
        await updateDoc(docRef, {
            status: "Done"
        })
       toast.success("Booking status updated successfully", {position: "top-center"})
    } catch (error) {
        toast.error(`An Error occured while updating booking.Please try again. "${error}"`, {position: "top-center"})
    }


    }
  return {updateBooking}
}
