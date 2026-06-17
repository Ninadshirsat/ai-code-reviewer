"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEFAULT_AUTH_CALLBACK,
  getSafeCallbackPath,
  SIGN_IN_PATH,
} from "../utils";

export async function signInWithGithub(formData: FormData) {
  const callback = formData.get("callbackUrl");

  const redirecTo = getSafeCallbackPath(
    typeof callback === "string" ? callback : null,
  );

  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirecTo,
    },
    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }
}

//getting logged in users data
export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

//if he has a authentication then redirect it to dashboard
export async function requireAuth(redirectTo = SIGN_IN_PATH) {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session; //returning session if already logged in
}

//if already logged in then redirect it to dashboard
export async function requireUnAuth(redirectTo = DEFAULT_AUTH_CALLBACK) {
  const session = await getServerSession();

  if (session) {
    redirect(redirectTo);
  }
}
