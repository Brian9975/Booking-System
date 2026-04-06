import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { db } from "../lib/firebase-config"


export default function useAddCustomer() {
 const [customerName, setCustomerName] = useState("")
 const [contact, setContact] = useState<number | null>(null)


  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
const collectionRef = collection(db, "customers");

try {
    await addDoc(collectionRef, {
        name: customerName,
        contact: contact,
        createdAt: serverTimestamp()
    })

    setCustomerName("")
    setContact(null)
    alert("New Customer Added Successfully")
} catch (error) {
    alert(`Error while adding Customer!! ${error}`)
}
  
  }




  return {handleAddCustomer, setCustomerName, setContact, contact, customerName}
}
