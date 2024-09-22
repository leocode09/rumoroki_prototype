import {
  collection,
  getDocs,
  limit,
  query,
  where,
  and,
} from "firebase/firestore";
import { getAuthTokens } from "../auth";
import { db } from "@/lib/firebase/client-app";
import { toUser } from "@/lib/utils";

export const getTool = async (toolId: string) => {
  const tokens = await getAuthTokens();
  const user = tokens ? toUser(tokens) : null;
  if (!user) return null;
  const q = query(collection(db, "tools"),
   where("id", "==", toolId),
   where("userId", "==", user.uid),

);

  const snapshot = await getDocs(q);

  const data = snapshot.docs.length > 0 ? snapshot.docs[0].data() : null;
  if(!data) return null
  return data;
};
export const getTools = async (toolId: string) => {
  const tokens = await getAuthTokens();
  const user = tokens ? toUser(tokens) : null;
  if (!user) return null;
  const q = query(collection(db, "tools"),
   where("id", "==", toolId),
   where("userId", "==", user.uid),

);

  const snapshot = await getDocs(q);

  const data = snapshot.docs;
  if(!data) return null
  return data;
};
