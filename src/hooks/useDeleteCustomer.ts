import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../lib/firebase-config"

import { useAuth } from "@/context/AuthContext"
import {toast} from "sonner"





export default function useDeleteCustomer() {
    const {user} = useAuth()
    const handleDelCus = async (id: string) => {
     try{
       const userId = user!.uid
        const docRef = doc(db, "customers", userId,  "customers", id)
       await deleteDoc(docRef)
       toast.success("Customer Deletion Completed Successfully", {position: "top-center"})
     } catch(error) {
       toast.error(`An error occured while deleting customer ${error}`, {position: "top-center"})
     }
    }
  return {
 handleDelCus
  }
}
