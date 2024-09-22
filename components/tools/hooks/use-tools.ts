import { AIState } from "@/actions/chat/actions";
import { generateTitle } from "@/actions/chat/title";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase/client-app";
import { addDoc, collection, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";

export const useGetTools = () => {
    const {
      user
    } = useAuth()

    const [tools, isLoading, error] = useCollectionData(
      user ?
      query(
        collection(db, "tools"),
        where("userId", "==", user.uid)
      ) : null
     );

    return {
      tools,
      isLoading,
      error
    }
};

export const useGetTool = (id: string) => {
  const {user} = useAuth()

  const [tool, isLoading, error] = useCollectionData(
    user ?
    query(
      collection(db, "tools"),
      where("id", "==", id),
      where("userId", "==", user.uid)
    ) : null
  )

 return {
   tool: tool ? tool[0] : null,
   isLoading,
   error
 }
};

export const useTools =  (toolId: string) => {
  const user = useAuth()?.user;

  const create = async (state: AIState,title: string)=>{
    if(user){
      addDoc(collection(db, "tools"),{
        ...state,
        userId: user.uid,
        title,
      })
    }
  }
  const update = async (state: AIState,title: string)=>{
    if (user) {
      const q = query(collection(db, "tools"),
       where("id", "==", toolId),
       where("userId", "==", user.uid),
      limit(1)
      );
      const snapshot = await getDocs(q);
  
      updateDoc(snapshot.docs[0].ref,{
        ...state,
        title,
      })
  }
}
  return {
    create,
    update
  }
}