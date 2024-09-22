import "server-only";

import { headers } from "next/headers";
import { initializeServerApp } from "firebase/app";

import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { cookies } from 'next/headers'

import {decrypt} from '@/lib/crypto'

export async function getAuthenticatedAppForUser() {
  const idToken = headers().get("Authorization")?.split("Bearer ")[1];

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {}
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}

type hash = {
  iv: string,
  content: string,
}
 
export async function gettoolData() {
  const encryptedtoolData = cookies().get('tool')?.value
  // return encryptedtoolData ? JSON.parse(decrypt(JSON.parse(encryptedtoolData))).content : null
}