import { useAuth } from "../../context/AuthContext"


export default function Customers() {
  const {logout} = useAuth()
  return (
    <div>
      <h1>Customers</h1>
      <button className="bg-blue-500" onClick={logout}>Log Out</button>
    </div>
  )
}
