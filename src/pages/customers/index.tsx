import { useEffect } from "react"

import { UserPlus } from "lucide-react"
import useAddCustomer from "../../hooks/useAddCustomer"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../lib/firebase-config"
import { useBookings } from "../../context/BookingsContext"
import type { CustomerData } from "../../types/customerData"
import { useAuth } from "../../context/AuthContext"
import {formatToJsDate} from "../../helpers/dateFormatter"







export default function Customers() {
  const {setCustomerName, setContact, handleAddCustomer, customerName, contact} = useAddCustomer()
  const {customerData, setCustomerData} = useBookings()
  const {user} = useAuth()

  useEffect(() => {
    const userId = user!.uid

    const collectionRef = collection(db, "customers", userId, "customers" )
    const q = query(collectionRef, orderBy("createdAt", "desc" ))
   const unsubscribe = onSnapshot(q, (snap) => {
     setCustomerData(snap.docs.map(doc => ({
     ...doc.data() as CustomerData,
     id: doc.id
     })))
   })
   return () => unsubscribe()
  }, [])
  return (
    <div>
      <h1 className="text-2xl mb-8 text-center font-bold">Customers</h1>


      <div className="flex justify-center pb-5">
       <div className="bg-blue-100  rounded-lg p-4 md:w-100 ">

       <h1 className="text-lg font-light text-blue-800">Customer's Details</h1>
       <hr className="mb-4"/>
    <form onSubmit={handleAddCustomer}  className="mb-2">
     <div>
     <label htmlFor="name" className="font-bold" >Customer's Name</label>
     <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} id="name"  className="border mt-2 mb-7 ring w-full  rounded placeholder-gray-600 px-2 py-1" type="text" placeholder="eg. John Doe" required/>
     </div>
       <div>
     <label htmlFor="name" className="font-bold" >Customer's Contact</label>
     <input  onChange={(e) => setContact(Number(e.target.value))}  className="border mb-7 ring w-full placeholder-gray-600 my-2 rounded px-2 py-1" type="number" placeholder="eg. 0711122222" required/>
     </div>
        <button  className="cursor-pointer px-2 py-2 w-full rounded shadow-lg flex justify-center items-center gap-3 mt-2 bg-gradient-to-b from-blue-800 from-10% to-lime-100 to-90%" type="submit"><UserPlus size={22}/><div>Add Customer</div></button>
    </form>
     
    <div>
      </div>
   
    </div>
    </div>


    {/* Customers Table Display */}
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-blue-900 px-2 border-black  border-2">Name</th><th className="border-2 text-blue-900 border-black text-left px-2">Contact</th>
          <th className="border-2 text-blue-900 border-black text-left px-2">Date Added</th>
        </tr>
      </thead>
      <tbody>
        {customerData.map(data => (
          <tr className="border-2" key={data.id}>
            <td className="px-2">{data.name}</td>
            <td className="border-2 px-2">{Number(data.contact)}</td>
            <td className="px-2">{formatToJsDate(data.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>


    </div>
  )
}
