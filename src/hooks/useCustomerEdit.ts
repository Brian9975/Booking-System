import { useState } from "react"
import type { CustomerData } from "../types/customerData"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../lib/firebase-config"
import { useAuth } from "../context/AuthContext"

export default function useCustomerEdit() {
const [editCusName, setEditCusName] = useState("")
const [editContact, setEditContact] = useState<number | null>(null)
const [customerToEditInfo, setCustomerToEditInfo] = useState<CustomerData | null>(null)
const {user} = useAuth()

const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
const userId = user!.uid
const docRef = doc(db, "customers", userId, "customers", customerToEditInfo!.id)
try{
 await updateDoc(docRef, {
  name: editCusName, 
  contact: editContact,
 })

alert("Customer Details Edited Successfully")
} catch(error) {
  alert(`An Error Occured while Editing Customer's Details ${error}`)
} finally{
  setCustomerToEditInfo(null)
}

}



  return {customerToEditInfo, setCustomerToEditInfo, handleEdit, editCusName, setEditCusName, editContact, setEditContact}
}
