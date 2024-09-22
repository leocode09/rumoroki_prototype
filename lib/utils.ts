import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from "nanoid"
import { Tokens } from "next-firebase-auth-edge"
import { User } from "@/context/auth-context"
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)
export const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;

  const customClaims = filterStandardClaims(decodedToken);

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  };
};

export function absoluteUrl(path: string) {
  const url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.VERCEL_URL!
  return `${url}${path}`
}