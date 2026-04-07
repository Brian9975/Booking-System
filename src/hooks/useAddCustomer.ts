import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { db } from "../lib/firebase-config"
import { useAuth } from "../context/AuthContext"


export default function useAddCustomer() {
 const [customerName, setCustomerName] = useState("")
 const [contact, setContact] = useState<"" | number>("")
 const {user} = useAuth()


  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()

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
    alert("New Customer Added Successfully")
} catch (error) {
    alert(`Error while adding Customer!! ${error}`)
}
  
  }




  return {handleAddCustomer, setCustomerName, setContact, contact, customerName}
}
