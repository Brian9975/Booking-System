import type { Timestamp } from "firebase/firestore";

type Status = "Pending" | "Done";
export interface BookingData {
  id: string;
  name: string;
  contact: number | string;
  customerId: string;
  service: string;
  date: string;
  status: Status;
  createdAt: Timestamp;
}
