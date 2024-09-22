"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const SignOutButton = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();

  const logOut = async () => {
    startTransition(async () => {
      const result = await signOut();
      if (result.success) {
        router.refresh();
      }
      if (result.error) return;
    });
  };
  if (!user) return null;

  return <Button variant="secondary" className="w-full justify-start" size="sm" onClick={logOut} disabled={isPending}>Log Out</Button>;
};
