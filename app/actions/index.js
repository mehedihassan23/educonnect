import { signIn } from "next-auth/react";

export async function doSocialLogin(formData) {
    const action = formData.get("action");
    await signIn(action, { redirectTo: "/courses"})
}