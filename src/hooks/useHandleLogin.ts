import type React from "react";
import { useBookings } from "../context/BookingsContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../lib/firebase-config";
import { useState } from "react";
import { toast } from "sonner";


export default function useHandleLogin() {
  const { loggedIn, setLoadingOnAct } = useBookings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingOnAct(true)
    e.preventDefault();

    if (loggedIn) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setTimeout(() => {
         toast.success("You are signed in successfully", {position: "top-left"});
        }, 2000);
      } catch (error) {
        toast.error(`An error occured when signing in ${error}`, {position: "top-center"});
      }
    } else if (!loggedIn) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setTimeout(() => {
          toast.success("Account Created Successfully", {position: "top-left"});
        }, 2000);
      } catch (error) {
        toast.error(`An error occured while creating account ${error}`, {position: "top-center"});
      }
    }
    setLoadingOnAct(false)
  };

  const logWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("You are logged in successfully", {position: "top-left"});
    } catch (error) {
      toast.error(`An error occured while signing you in`, {position: "top-center"});
    }
  };
  return { handleLogin, email, password, setEmail, setPassword, logWithGoogle };
}
