export const SIGN_IN_PATH = "/sign-in";
export const DEFAULT_AUTH_CALLBACK = "/dashboard"; //go here after sign-in

//checking if callback is coming from the correct place (not a malicious callback)
export function getSafeCallbackPath(
  callbackUrl: string | null | undefined,
): string {
  if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return DEFAULT_AUTH_CALLBACK;
}
