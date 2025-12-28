"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SocialLogins from "./social-login";

const LoginForm = () => {
  const router = useRouter()

    const onSubmit = async (event) => {
        event.preventDefault()
         
        try {
            const formData = new FormData(event.currentTarget)
            // const response = await credentialLogin(formData)
            const res = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
              });

              if(res.error == undefined){
                 router.push("/courses")
              }else{
                alert("Something went wrong")
              }
 
             
        } catch (error) {
        
        }
       
    }

  return (
    <Card className="mx-auto max-w-sm w-full">
    <CardHeader>
      <CardTitle className="text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={onSubmit}> 
        <div className="grid gap-4">
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
            />
            </div>
            <div className="grid gap-2">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
                </Link> */}
            </div>
            <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
            Login
            </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <p>Register as a <br />
        <Link href="/register/instructor" className="underline mr-5">
          Instructor
        </Link>
        <Link href="/register/user" className="underline">
          User
        </Link>
        </p>
      </div>

      <SocialLogins />


    </CardContent>
  </Card>
  )
}

export default LoginForm
