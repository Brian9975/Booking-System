import { useEffect, useState } from "react";

import { UserPlus } from "lucide-react";
import useAddCustomer from "../../hooks/useAddCustomer";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import { useBookings } from "../../context/BookingsContext";
import type { CustomerData } from "../../types/customerData";
import { useAuth } from "../../context/AuthContext";
import { formatToJsDate } from "../../helpers/dateFormatter";
import useCustomerEdit from "../../hooks/useCustomerEdit";
import useDeleteCustomer from "../../hooks/useDeleteCustomer";


export default function Customers() {
  const { setCustomerName, loadingCus, setContact, contact, handleAddCustomer, customerName } =
    useAddCustomer();
  const { customerData, setCustomerData } = useBookings();
  const { user } = useAuth();
  const {setEditContact,editCusName, editContact, setEditCusName, handleEdit, customerToEdit, setCustomerToEdit} = useCustomerEdit()
  const [cusToDel, setCusToDel] = useState<string | null>(null)
  const {handleDelCus} = useDeleteCustomer()


 if (loadingCus) {
  return <div className="min-h-screen ">

  </div>
 }

  
  const customerToEditInfo = customerData.find(data => data.id === customerToEdit)
  useEffect(() => {
    const userId = user!.uid;

    const collectionRef = collection(db, "customers", userId, "customers");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setCustomerData(
        snap.docs.map((doc) => ({
          ...(doc.data() as CustomerData),
          id: doc.id,
        })),
      );
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {

 
   if (customerToEditInfo) {
     setEditCusName(customerToEditInfo.name)
     setEditContact(Number(customerToEditInfo.contact))
   }
  },[customerToEdit])
  return (
    <div>
      <h1 className="text-2xl mb-8 text-center font-bold">Customers</h1>

      <div className="flex justify-center pb-5">
        <div className="bg-blue-100  rounded-lg p-4 md:w-100 ">
          <h1 className="text-lg font-light text-blue-800">
            Customer's Details
          </h1>
          <hr className="mb-4" />
          <form onSubmit={handleAddCustomer} className="mb-2">
            <div>
              <label htmlFor="name" className="font-bold">
                Customer's Name
              </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                id="name"
                className="border mt-2 mb-7 ring w-full  rounded placeholder-gray-600 px-2 py-1"
                type="text"
                placeholder="eg. John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="font-bold">
                Customer's Contact
              </label>
              <input
                onChange={(e) => setContact(Number(e.target.value))}
                className="border mb-7 ring w-full placeholder-gray-600 my-2 rounded px-2 py-1"
                type="number"
                value={contact}
                placeholder="eg. 0711122222"
                required
              />
            </div>
            <button
              className="cursor-pointer px-2 py-2 w-full rounded shadow-lg flex justify-center items-center gap-3 mt-2 bg-linear-to-b from-blue-800 from-10% to-lime-100 to-90%"
              type="submit"
            >
              <UserPlus size={22} />
              <div>Add Customer</div>
            </button>
          </form>

        
        </div>
      </div>

      {/* Customers Table Display */}
      <table className="w-full my-4">
        <thead>
          <tr>
            <th className="text-left text-blue-900 px-2 border-black  border-2">
              Name
            </th>
            <th className="border-2 text-blue-900 border-black text-left px-2">
              Contact
            </th>
            <th className="border-2 text-blue-900 border-black text-left px-2">
              Date Added
            </th>

            <th className="text-right px-7 text-blue-900 border-2 border-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((data) => (
            <tr className="border-2" key={data.id}>
              <td className="px-2">{data.name}</td>
              <td className="border-2 px-2">{Number(data.contact)}</td>
              <td className="px-2">{formatToJsDate(data.createdAt)}</td>
              <td className="border-2 text-right px-2">
                <button onClick={() => setCustomerToEdit(data.id)} className="bg-blue-800 shadow-lg my-2 px-5 font-bold hover:opacity-90 cursor-pointer py-1 rounded-lg text-blue-100 ">Edit</button>
                 <button onClick={() => setCusToDel(data.id)} className="bg-blue-100 my-2 px-5 font-bold hover:opacity-90 cursor-pointer py-1 rounded-lg text-blue-950 shadow-lg mx-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

           {/* Edit Form Dialog */}  
{ customerToEdit &&
      <div onClick={() => setCustomerToEdit(null)} className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
           <div onClick={e => e.stopPropagation()} className="shadow-xl bg-white rounded-lg p-4 md:w-100 ">
          <h1 className="text-lg font-light text-blue-800">
           Edit Customer's Details
          </h1>
          <hr className="mb-4" />
          <form onSubmit={handleEdit} className="mb-2">
            <div>
              <label htmlFor="name" className="font-bold">
                Customer's Name
              </label>
              <input
                value={editCusName}
                onChange={(e) => setEditCusName(e.target.value)}
                id="name"
                className="border mt-2 mb-7 ring w-full  rounded placeholder-gray-600 px-2 py-1"
                type="text"
                placeholder="eg. John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="font-bold">
                Customer's Contact
              </label>
              <input
                onChange={(e) => setEditContact(Number(e.target.value))}
                className="border mb-7 ring w-full placeholder-gray-600 my-2 rounded px-2 py-1"
                type="number"
                value={editContact}
                placeholder="eg. 0711122222"
                required
              />
            </div>

<div className="flex justify-between items-center">
              <button
              className="cursor-pointer  px-6 py-2 shadow-lg bg-lime-300 rounded-lg"
              type="button"
              onClick={() => setCustomerToEdit(null)}
            >
              <div className="font-bold">Cancel</div>
            </button>
            <button
              className="cursor-pointer px-6 py-2 rounded-lg shadow-lg gap-3 mt-2 bg-linear-to-b from-blue-800 from-10% to-lime-100 to-90%"
              type="submit"
            >
              <div className="font-bold">Save</div>
            </button>

            </div>
          
          </form>

        
        </div>
      </div>


      }
   {/* Delete Customer Dialog */}
   { cusToDel &&
      <div onClick={() => {
        setCusToDel(null)
      }} className="inset-0 z-50 fixed bg-black/50 flex justify-center items-center">
       <div onClick={e => e.stopPropagation()} className="bg-blue-100 w-100 py-3 px-4 rounded-lg shadow-lg">
        <h1 className="font-bold text-xl mb-4">Are you absolutely sure?</h1>
        <p>This action cannot be undone.</p>

        <div className="flex py-2 mt-4 justify-between items-center">
          <button onClick={() => setCusToDel(null)} className="bg-lime-300 cursor-pointer py-1 px-5 rounded-lg">Cancel</button>
          <button onClick={() => {
            handleDelCus(cusToDel)
            setCusToDel(null)
            }} className="bg-blue-800 cursor-pointer py-1 px-5 rounded-lg text-blue-100">Continue</button>

        </div>
       </div>
      </div>
      }
    </div>
  );
}
