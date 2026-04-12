import { useState } from "react"
import {toast} from "sonner"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../lib/firebase-config"
import { useAuth } from "../context/AuthContext"
import { useBookings } from "@/context/BookingsContext"

export default function useCustomerEdit() {
const [editCusName, setEditCusName] = useState("")
const [editContact, setEditContact] = useState(0)
const [customerToEdit, setCustomerToEdit] = useState<string | null>(null)
const {user} = useAuth()
const {setLoadingOnAct} = useBookings()



const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
  setLoadingOnAct(true)
e.preventDefault()
const userId = user!.uid
if (customerToEdit === null) {
 return
}
const docRef = doc(db, "customers", userId, "customers", customerToEdit)
try{
 await updateDoc(docRef, {
  name: editCusName, 
  contact: editContact,
 })

toast.success("Customer Details Edited Successfully", {position: "top-center"})
} catch(error) {
  toast.error(`An Error Occured while Editing Customer's Details ${error}`, {position: "top-center"})
} finally{
  setCustomerToEdit(null)
  setLoadingOnAct(false)
}

}



  return {customerToEdit, setCustomerToEdit, handleEdit, editCusName, setEditCusName, editContact, setEditContact}
}
