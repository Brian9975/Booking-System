import React from 'react'
import type { CustomerData } from '../types/customerData'
import { useAuth } from '../context/AuthContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase-config'
import { toast } from 'sonner'

export default function useCreateBooking() {
   const {user} = useAuth()

    const handleCreateBooking = async (e: React.FormEvent<HTMLFormElement>, customerInfo: CustomerData[], selected: string, service: string, date: string, setSelected: React.Dispatch<React.SetStateAction<string | null>>, setService:  React.Dispatch<React.SetStateAction<string>>, setDate:  React.Dispatch<React.SetStateAction<string>>) => {
      e.preventDefault()
      if (!selected) {
        alert("Select customer to continue")
      }

     const userId = user!.uid
    //  Selected Customer's Information
    const selectedCus = customerInfo.find(info => info.id === selected)
     try {
        const collectionRef = collection(db, "bookings", userId, "bookings")

        await addDoc(collectionRef, {
          name: selectedCus?.name,
          contact: selectedCus?.contact,
          customerId: selected,
          service: service,
          date: date,
          status: "Pending",
          createdAt: serverTimestamp()
        })

        setSelected(null)
        setService("")
        setDate("")
        toast.success("Booking created successfully", {position: "top-center"})
     } catch (error) {
        toast.error(`Error while creating booking ${error}`, {position: "top-center"})
     }
    }

  return {handleCreateBooking}
}
