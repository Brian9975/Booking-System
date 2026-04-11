import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { db } from "../lib/firebase-config"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"


export default function useAddCustomer() {
 const [customerName, setCustomerName] = useState("")
 const [contact, setContact] = useState<"" | number>("")
  const [loadingCus, setLoadingCus] = useState(false)
 const {user} = useAuth()


  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   setLoadingCus(true)

const userId = user!.uid
const collectionRef = collection(db, "customers", userId, "customers");

try {
    await addDoc(collectionRef, {
        name: customerName,
        contact: contact,
        createdAt: serverTimestamp()
    })

    setCustomerName("")
    setContact("")
    toast.success("New Customer Added Successfully", {position: "top-center"})
} catch (error) {
  toast.error(`Error while adding Customer!! ${error}`, {position: "top-center"})
} finally{
  setLoadingCus(false)
}
  
  }




  return {handleAddCustomer,loadingCus, setCustomerName, setContact, contact, customerName}
}
