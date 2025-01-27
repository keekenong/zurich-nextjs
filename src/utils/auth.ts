import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession as nextAuthUseSession } from "next-auth/react";

export const useSession = nextAuthUseSession;

export const signIn = async (provider: string = "google") => {
    return await nextAuthSignIn(provider, {callbackUrl: window.location.href});
}

export const signOut = (callbackUrl: string) => {
    return nextAuthSignOut({ callbackUrl })
}