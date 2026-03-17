import { auth } from "@/lib/auth";
import AuthClientPage from "@/components/AuthClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
   await new Promise((resolve ,rejects)=>setTimeout(resolve ,5000))
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
   
 <AuthClientPage />  
  )
 
}