import Select from "react-select"
import "../../index.css"
import { CalendarPlus } from "lucide-react"
import { db } from "../../lib/firebase-config"
import { useState, useEffect } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import type { CustomerData } from "../../types/customerData"
import { useAuth } from "../../context/AuthContext"
import useCreateBooking from "../../hooks/useCreateBooking"
export default function Bookings() {

  const [customerInfo, setCustomerInfo] = useState<CustomerData[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [service, setService] = useState("")
  const {user} = useAuth()
  const [date, setDate] = useState(() => {
    return ""
  }
    
  )
  const {handleCreateBooking} = useCreateBooking()

  const options = customerInfo.map(data => ({
    label: data.name,
    value: data.id,
  }))

  const currentSelection = options.find(option => option.value === selected) || null

 

  useEffect(() => {

    const userId = user!.uid
    const q = query(collection(db, "customers", userId, "customers"))
    const unsubscribe = onSnapshot((q), (snap) => {
      setCustomerInfo(snap.docs.map(doc => (
        {
          ...doc.data() as CustomerData,
          id:doc.id
        }
      )))
    })
return () => unsubscribe()
  }, [])
  return (
    <div>
     <h1 className="text-2xl mb-8 text-center font-bold">Bookings Management</h1>



           <div className="flex justify-center pb-5">
             <div className="bg-blue-100 rounded-lg p-4 md:w-100 ">
               <h1 className="text-lg font-light text-blue-800">
                 Create New Booking
               </h1>
               <hr className="mb-4" />
               <form onSubmit={(e) => {
                handleCreateBooking(e, customerInfo, selected!, service, date, setSelected, setService, setDate )
               }} className="mb-2">
                 <div>
                   <label htmlFor="customer" className="font-bold">
                     Select Customer
                   </label>
                   <div>
                 <Select
                 
                 unstyled 
      classNamePrefix={"my-select"}
  classNames={{
        // The main container box
        control: ({ isFocused }) =>
          `flex w-full mb-4 px-2 py-1 border-2 cursor-pointer rounded-md transition-all duration-200 
           ${isFocused ? 'border-blue-950 ring-2 ring-blue-100' : 'border-blue-900 bg-blue-100'}`,
        
        // The input where you type to search
        input: () => 'text-gray-600 focus:ring-0',
        
        // The text for the currently selected item
        singleValue: () => 'text-blue-950 font-bold',
        
        // The placeholder text
        placeholder: () => 'text-gray-600',

        // The dropdown menu container
        menu: () => 'mt-2 border  border-gray-100 bg-lime-50 rounded-md shadow-xl overflow-auto',

        // Individual items in the list
        option: ({ isFocused, isSelected }) =>
          `  hover:bg-lime-300 hover:text-blue-950  px-3 py-2 transition-colors 
           ${isSelected ? 'bg-blue-900 text-blue-50' : isFocused ? 'bg-blue-50 cursor-pointer' : 'text-blue-950  '}`,
        
        // The container for the "X" and "chevron" icons on the right
        indicatorsContainer: () => 'gap-1',
        
        // The specific dropdown arrow icon
        dropdownIndicator: () => 'text-gray-400 hover:text-blue-900',

        // The separator line between text and arrow
        indicatorSeparator: () => 'bg-gray-200 w-[1px] my-1',
      }}

    value={currentSelection}
    options={options} 
    onChange={option => setSelected(option ? option.value : null)}
    isSearchable
    isClearable
    placeholder="Search for a customer..."
  />
                  </div>

                
                 </div>
                 <div>
                   <label htmlFor="name" className="font-bold">
                     Service
                   </label>
                   <input

                     className="border mb-7 ring w-full placeholder-gray-600 my-2 rounded px-2 py-1"
                     type="text"
                     onChange={(e) => setService(e.target.value)}
                     value={service}
                     placeholder="eg. Haircut"
                     required
                   />
                 </div>

                   <div>
                    <label className="font-bold" htmlFor="date">Pick a date</label>
                  
                    <input value={date} onChange={e => setDate(e.target.value)} id="date" className="w-full border-2 py-1 px-2 rounded-md mb-4 cursor-pointer" type="date" required/>
                  </div>
                 <button
                   className="cursor-pointer font-bold px-2 py-2 w-full rounded bg-blue-900 text-blue-100 shadow-lg flex justify-center items-center gap-3 mt-2 "
                   type="submit"
                 >
                   <CalendarPlus size={22} />
                   <div>Create Booking</div>
                 </button>
               </form>
     
             
             </div>
           </div>

           {/* List of bookings */}

           
     
    </div>
  )
}
