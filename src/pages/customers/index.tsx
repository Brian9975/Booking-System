import { useEffect } from "react"

import { UserPlus } from "lucide-react"
import useAddCustomer from "../../hooks/useAddCustomer"








export default function Customers() {
  const {setCustomerName, setContact, handleAddCustomer, customerName, contact} = useAddCustomer()



  useEffect(() => {
   
  }, [])
  return (
    <div>
      <h1 className="text-2xl mb-8 text-center font-bold">Customers</h1>


      <div className="flex justify-center">
       <div className="bg-blue-100  rounded-lg p-4 md:w-100 ">

       
    <form onSubmit={handleAddCustomer}  className="mb-2">
     <div>
     <label htmlFor="name" className="font-bold" >Customer's Name</label>
     <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} id="name"  className="border mt-2 mb-7 ring w-full  rounded placeholder-gray-600 px-2 py-1" type="text" placeholder="eg. John Doe" required/>
     </div>
       <div>
     <label htmlFor="name" className="font-bold" >Customer's Contact</label>
     <input value={Number(contact)} onChange={(e) => setContact(Number(e.target.value))}  className="border mb-7 ring w-full placeholder-gray-600 my-2 rounded px-2 py-1" type="number" placeholder="eg. 0711122222" required/>
     </div>
        <button  className="cursor-pointer px-2 py-2 w-full rounded shadow-lg flex justify-center items-center gap-3 mt-2 bg-gradient-to-b from-blue-800 from-10% to-lime-100 to-90%" type="submit"><UserPlus size={22}/><div>Add Customer</div></button>
    </form>
     
    <div>
      </div>
   
    </div>
    </div>


    {/* Customers Table Display */}



    </div>
  )
}
