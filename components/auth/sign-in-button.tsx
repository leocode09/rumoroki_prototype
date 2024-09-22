"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const SignInButton = () => {
  const router = useRouter();
  const { user } = useAuth()
  const [isPending, startTransition] = useTransition();
  
  const signIn = async () => {
    startTransition(async () => {
      const result = await signInWithGoogle();
      if(result.error) return;
      if(result.success){
        router.push("/tools");
      }
    });
  };
  if(user) return <>{user.email}<p className="text-red-500">{user.uid}</p></>;

  return (
    <Button onClick={signIn} disabled={isPending}>
      Get Started
    </Button>
  );
};