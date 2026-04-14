import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase-config";
import { toast } from "sonner";
import { useBookings } from "@/context/BookingsContext";

export default function useUpdateBooking() {
  const { user } = useAuth();
  const { setLoadingOnAct } = useBookings();

  const updateBooking = async (id: string) => {
    setLoadingOnAct(true);
    const userId = user!.uid;
    const docRef = doc(db, "bookings", userId, "bookings", id);

    try {
      await updateDoc(docRef, {
        status: "Done",
      });
      toast.success("Booking status updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(
        `An Error occured while updating booking.Please try again. "${error}"`,
        { position: "top-center" },
      );
    } finally {
      setLoadingOnAct(false);
    }
  };
  return { updateBooking };
}
