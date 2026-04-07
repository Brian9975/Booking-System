import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../lib/firebase-config"
import { useAuth } from "../context/AuthContext"


export default function useDeleteCustomer() {
    const {user} = useAuth()
    const handleDelCus = async (id: string) => {
     try{
       const userId = user!.uid
        const docRef = doc(db, "customers", userId,  "customers", id)
       await deleteDoc(docRef)
     } catch(error) {

     }
    }
  return {
 handleDelCus
  }
}
