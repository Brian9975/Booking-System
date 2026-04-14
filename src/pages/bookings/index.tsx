import Select from "react-select"
import "../../index.css"
import { CalendarPlus, CalendarX } from "lucide-react"
import { db } from "../../lib/firebase-config"
import { useState, useEffect } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import type { CustomerData } from "../../types/customerData"
import { useAuth } from "../../context/AuthContext"
import useCreateBooking from "../../hooks/useCreateBooking"
import { useBookings } from "../../context/BookingsContext"
import type { BookingData } from "../../types/bookingData"
import useUpdateBooking from "../../hooks/useUpdateBooking"
import { formatToJsDate } from "../../helpers/dateFormatter"
import useDeleteBooking from "../../hooks/useDeleteBooking"
import { Spinner } from "@/components/ui/spinner"
import SkeletonTable from "@/components/skeletonTable"
export default function Bookings() {


  const [bookingToMark, setBookingToMark] = useState<string | null>(null)
  const [bookingToDel, setBookingToDel] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState<CustomerData[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [service, setService] = useState("")
  const {user} = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  
  const [date, setDate] = useState(() => {
    return ""
  }
    
  )
  const {handleCreateBooking} = useCreateBooking()
  const {setBookingInfo, bookingInfo, loadingOnAct} = useBookings()
  const {updateBooking} = useUpdateBooking()
  const {deleteBooking} = useDeleteBooking()
  



  const options = customerInfo.map(data => ({
    label: data.name,
    value: data.id,
  }))

  const currentSelection = options.find(option => option.value === selected) || null

 
  useEffect(() => {
     const userId = user!.uid
     const q = query(collection(db, "bookings", userId, "bookings"), orderBy("date", "asc"))
   const unsubscribe = onSnapshot(q, (snap) => {
    setBookingInfo(snap.docs.map(doc => ({
      ...doc.data() as BookingData,
      id: doc.id
    })))
    setLoadingData(false)
   })

   return () => unsubscribe()
  }, [])

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
  }, [user])

    if (loadingOnAct) {
   return <div className="bg-blue-300 h-screen gap-1 inset-0 fixed flex justify-center items-center flex-col">
    <Spinner className="size-10"/>
      <div>
        <p className="font-light text-lg">Saving...</p>
      </div>
      
   </div>
  }
  return (
    <div>
     <h1 className="sm:text-2xl text-3xl mb-8 text-center font-bold">Bookings Management</h1>



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
                  
                    <input value={date} onChange={e => setDate(e.target.value)} id="date" className="w-full border-2 py-1 px-2 rounded-md mb-4 cursor-pointer" type="date"  min={new Date().toISOString().split('T')[0]} required/>
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
          { loadingData ? <SkeletonTable/> :  bookingInfo.length === 0 ? <div className="text-center mt-4 flex border-2 mb-7 rounded-lg p-2 justify-center flex-col items-center">
                  <CalendarX size={50} />
                  <h1 className="text-xl mt-1 font-bold">No bookings added yet!</h1>
                  <p>You can create a booking in the form above.</p>
                </div> :
     <table className="w-full my-4">
            <thead>
              <tr>
                <th className="text-left text-blue-900 px-2 border-black  border-2">
                  Customer
                </th>
                <th className="border-2 text-blue-900 border-black text-left px-2">
                  Contact
                </th>
                <th className="border-2 text-blue-900 border-black text-left px-2">
                  Service
                </th>
    
                <th className="text-left px-4 text-blue-900 border-2 border-black">
                  Date
                </th>
                <th className="border-2 text-blue-900 px-2 text-left border-black">
                  Status
                </th>

                <th className="border-2 text-right text-blue-900 px-5 border-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingInfo.map((data) => (
                <tr className="border-2" key={data.id}>
                  <td className="px-2">{data.name}</td>
                  <td className="border-2 px-2">0{Number(data.contact)}</td>
                  <td className="px-2">{data.service}</td>
                  <td className="border-2 text-left px-4">
                   {formatToJsDate(data.date)}
                  </td>
                  <td className={`border-2 text-left border-black font-bold px-2 ${data.status === "Done" ? "text-lime-700" : "text-amber-700"}`}>
                    {data.status}
                  </td>
                  <td className="border-2 text-right px-2">
                    {data.status === "Pending" ? <button  onClick={() => setBookingToMark(data.id)} className="bg-lime-700 text-lime-100 text-sm sm:text-md w-30 sm:w-40 rounded-lg py-2 font-bold shadow-md shadow-lime-950 cursor-pointer px-2 my-2">Mark as Done</button> : <button onClick={() => setBookingToDel(data.id)} className="bg-blue-100 py-2 px-7 my-2 rounded-lg font-bold cursor-pointer shadow-md shadow-black">Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}


   {/* Update Booking Status Dialog */}
   { bookingToMark &&
      <div onClick={() => {
        setBookingToMark(null)
      }} className="inset-0 z-50 fixed bg-black/50 flex justify-center items-center">
       <div onClick={e => e.stopPropagation()} className="bg-blue-100 w-100 py-3 px-4 rounded-lg shadow-lg">
        <h1 className="font-bold text-xl mb-4">Are you absolutely sure?</h1>
        <p>This will update the booking status to done.</p>

        <div className="flex py-2 mt-4 justify-between items-center">
          <button onClick={() => setBookingToMark(null)} className="bg-lime-300 cursor-pointer shadow-md shadow-lime-600 py-2 px-6 rounded-lg">Cancel</button>
          <button onClick={() => {
            if (bookingToMark !== null) {
            updateBooking(bookingToMark)
            setBookingToMark(null)
            }
            }} className="bg-blue-800 cursor-pointer py-2 px-6 shadow-md shadow-blue-950 rounded-lg text-blue-100">Continue</button>

        </div>
       </div>
      </div>
      }


         {/* Delete booking dialog */}
   { bookingToDel &&
      <div onClick={() => {
        setBookingToDel(null)
      }} className="inset-0 z-50 fixed bg-black/50 flex justify-center items-center">
       <div onClick={e => e.stopPropagation()} className="bg-blue-100 w-100 py-3 px-4 rounded-lg shadow-lg">
        <h1 className="font-bold text-xl mb-4">Are you absolutely sure?</h1>
        <p>This action cannot be undone.</p>

        <div className="flex py-2 mt-4 justify-between items-center">
          <button onClick={() => setBookingToDel(null)} className="bg-lime-300 cursor-pointer shadow-md shadow-lime-600  py-2 px-6 rounded-lg">Cancel</button>
          <button onClick={() => {
            if (bookingToDel !== null) {
            deleteBooking(bookingToDel)
            setBookingToDel(null)
            }
            }} className="bg-blue-800 shadow-blue-950 shadow-md cursor-pointer py-2 px-6 rounded-lg text-blue-100">Continue</button>

        </div>
       </div>
      </div>
      }
     
    </div>
  )
}
