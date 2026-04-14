import type { Timestamp } from "firebase/firestore";

export interface CustomerData {
  id: string;
  name: string;
  contact: Number | null;
  createdAt: Timestamp;
}
