import type React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  CalendarCheck,
  Contact,
  TextAlignJustify,
  X,
} from "lucide-react";
import { Toaster } from "../ui/sonner";
import { Spinner } from "../ui/spinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="bg-blue-300 h-screen gap-1 inset-0 fixed flex justify-center items-center flex-col">
        <Spinner className="size-15" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-linear-to-b  from-blue-500 from-10% to-lime-300 to-90% min-h-screen">
      {/* Topbar */}
      <div className="bg-blue-200 border-b-2 border-lime-800 shadow-xl items-center justify-between flex py-3 px-2">
        <div>
          {" "}
          <h1 className="font-extrabold text-lg">C & B System</h1>
        </div>

        <div className="flex justify-center items-center gap-9 mr-2">
          {user.photoURL ? (
            <div
              style={{ backgroundImage: `url(${user.photoURL})` }}
              className={`bg-center bg-cover rounded-full h-9 w-9`}
            ></div>
          ) : (
            <div className="h-9 w-9 bg-lime-600 rounded-full flex justify-center items-center text-lime-100">
              <div>
                <p className="font-bold">{user.email![0].toUpperCase()}</p>
              </div>
            </div>
          )}

          <div className="sm:hidden flex items-center justify-center">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
            >
              {showMenu ? <X size={22} /> : <TextAlignJustify size={22} />}
            </button>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="bg-blue-200  text-center sm:hidden p-2 shadow-md shadow-blue-950">
          <div className="py-1">
            <Link className="font-bold text-lg text-blue-950" to="/customers">
              Customers
            </Link>
          </div>
          <div className="py-2">
            <Link className="font-bold  text-lg text-blue-950" to="/bookings">
              Bookings
            </Link>
          </div>
          <div>
            <button
              onClick={logout}
              className="bg-lime-400 shadow-lime-700 shadow-lg cursor-pointer px-6 py-1 my-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="sm:flex h-screen overflow-hidden">
        {/* sidebar */}
        <div className="hidden flex-start sm:block h-screen bg-blue-200 w-60">
          <div className=" flex flex-col items-center p-2">
            <div className="my-3 ">
              <button
                onClick={() => navigate("/customers")}
                className="bg-blue-900  my-2 py-2 px-15 cursor-pointer hover:bg-blue-800 text-blue-100 rounded-md"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Contact />
                  <div>Customers</div>
                </div>
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate("/bookings")}
                className="bg-blue-900  my-2  px-15 p-2 cursor-pointer hover:bg-blue-800 text-blue-100 rounded-md"
              >
                <div className="flex justify-center gap-2 items-center">
                  <CalendarCheck />
                  <div>Bookings</div>
                </div>
              </button>
            </div>
            <button
              onClick={logout}
              className="bg-lime-400 mt-5 shadow-lg shadow-lime-700 hover:opacity-80 cursor-pointer w-40 p-2 rounded-md"
            >
              <div className="flex gap-2 justify-center items-center ">
                <LogOut size={20} />
                <div>Log Out</div>
              </div>
            </button>
          </div>
        </div>

        <main className="p-2 h-screen overflow-y-auto sm:flex-1">
          {children}
        </main>
        <Toaster className="z-50" />
      </div>
    </div>
  );
}
