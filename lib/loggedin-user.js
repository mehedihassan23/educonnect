
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/queries/users";



export async function getLoggedInUser() {
  const session = await auth();

  if (!session?.user) return null;

  return getUserByEmail(session?.user?.email);
}