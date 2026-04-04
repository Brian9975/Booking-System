import type React from "react";
import { useBookings } from "../context/BookingsContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../lib/firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandleLogin() {
  const { loggedIn } = useBookings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loggedIn) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/customers");
        setTimeout(() => {
          alert("You are signed in successfully");
        }, 2000);
      } catch (error) {
        alert(`An error occured when signing in ${error}`);
      }
    } else if (!loggedIn) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/customers");
        setTimeout(() => {
          alert("Account Created Successfully");
        }, 2000);
      } catch (error) {
        alert(`An error occured while creating account ${error}`);
      }
    }
  };

  const logWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/customers");
      alert("You are logged in successfully");
    } catch (error) {
      alert(`An error occured while signing you in`);
    }
  };
  return { handleLogin, email, password, setEmail, setPassword, logWithGoogle };
}
