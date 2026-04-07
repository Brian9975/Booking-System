import { useState } from "react"

import { doc, updateDoc } from "firebase/firestore"
import { db } from "../lib/firebase-config"
import { useAuth } from "../context/AuthContext"

export default function useCustomerEdit() {
const [editCusName, setEditCusName] = useState("")
const [editContact, setEditContact] = useState(0)
const [customerToEdit, setCustomerToEdit] = useState<string | null>(null)
const {user} = useAuth()

const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
const userId = user!.uid
const docRef = doc(db, "customers", userId, "customers", customerToEdit!)
try{
 await updateDoc(docRef, {
  name: editCusName, 
  contact: editContact,
 })

alert("Customer Details Edited Successfully")
} catch(error) {
  alert(`An Error Occured while Editing Customer's Details ${error}`)
} finally{
  setCustomerToEdit(null)
}

}



  return {customerToEdit, setCustomerToEdit, handleEdit, editCusName, setEditCusName, editContact, setEditContact}
}
