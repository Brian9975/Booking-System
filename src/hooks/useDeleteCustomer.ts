import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase-config";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useBookings } from "@/context/BookingsContext";

export default function useDeleteCustomer() {
  const { user } = useAuth();
  const { setLoadingOnAct } = useBookings();

  const handleDelCus = async (id: string) => {
    setLoadingOnAct(true);
    try {
      const userId = user!.uid;
      const docRef = doc(db, "customers", userId, "customers", id);
      await deleteDoc(docRef);
      toast.success("Customer Deletion Completed Successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`An error occured while deleting customer ${error}`, {
        position: "top-center",
      });
    } finally {
      setLoadingOnAct(false);
    }
  };
  return {
    handleDelCus,
  };
}
