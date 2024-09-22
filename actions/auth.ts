"use server";

import { User } from "@/context/auth-context";
import { adminConfig } from "@/lib/firebase/admin";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { cookies } from "next/headers";

export const getAuthTokens = async ()=>{
    const tokens = await getTokens(cookies(), {
        apiKey: adminConfig.apiKey,
        cookieName: 'AuthToken',
        cookieSignatureKeys: [
          adminConfig.signatureKey
        ],
        serviceAccount: {
          projectId: adminConfig.projectId,
          clientEmail: adminConfig.clientEmail,
          privateKey: adminConfig.privateKey,
        }
      });

    return tokens;
}