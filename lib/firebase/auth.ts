import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "./client-app";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const credential = await signInWithPopup(auth, provider);

    const idToken = await credential.user.getIdToken();
    // Sets authenticated browser cookies
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    return {
      success: "Successfully signed in",
    }
  } catch (error) {

    console.error("Error signing in", error);

    return {
      error: "Error signing in",
    }
  }
}

export async function signOut() {
  try {
    auth.signOut();    
    await fetch("/api/logout");
    return {
      success: "Successfully signed out",
    }
  } catch (error) {
    console.error("Error signing out", error);
    return {
      error: "Error signing out",
    }
  }
}
