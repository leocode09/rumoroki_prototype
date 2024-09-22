import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { createRouteMatcher } from "./lib/route-matcher";
import { getAuthTokens } from "./actions/auth";
import { firebaseConfig } from "./lib/firebase/config";
import { adminConfig } from "./lib/firebase/admin";
const isProtectedRoute = createRouteMatcher(["/tools(.*)"]);

export async function middleware(request: NextRequest) {
    const tokens = await getAuthTokens();
    if(isProtectedRoute(request) && !tokens){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: adminConfig.apiKey,
    cookieName: "AuthToken",
    cookieSignatureKeys: [
      adminConfig.signatureKey,
    ],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    serviceAccount: {
      projectId: adminConfig.projectId,
      clientEmail: adminConfig.clientEmail,
      privateKey: adminConfig.privateKey,
    },
    enableMultipleCookies: true, // Recommended, but `false` by default to keep backwards compatibility. Set to false on Firebase Hosting due to https://stackoverflow.com/questions/44929653/firebase-cloud-function-wont-store-cookie-named-other-than-session
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
