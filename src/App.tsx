import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./auth/login"
import Customers from "./pages/customers"
import Bookings from "./pages/bookings"

function App() {
 

  return (
<Router>

<Routes>
{/* Public Route */}
<Route path="/login" element={<Login/>}/>

{/* Protected Routes */}
<Route path="/customers" element={<Customers/>}/>
<Route path="/bookings" element={<Bookings/>} />

<Route path="/" element={<Navigate to="/customers"/>}/>
<Route path="*" element={<Navigate to="/login"/>}/>

</Routes>



</Router>
  )
}

export default App
