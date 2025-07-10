import { Wrapper } from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { Toaster } from "sonner"





export function SignUp() {

  const [userName, setUsername ] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("")
  const signUp = useUserStore((state)=>state.signup)
  const errorMsg = useUserStore((state)=>state.error)

  const navigate = useNavigate()

  const onclickHandler = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

    await signUp(userName, password, firstName, lastName)
    const token = localStorage.getItem("auth_Token")
    if(token){
      return navigate('/dashboard')
    }
    else{
      toast(await errorMsg)
    }

  }


  return (
    <Wrapper>
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link to="/signin">Sign In</Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={onclickHandler}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e)=> setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="FirstName">FirstName</Label>
                  <Input
                    id="FirstName"
                    type="text"
                    placeholder="FirstName"
                    onChange={(e)=> setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="LastName">LastName</Label>
                  <Input
                    id="LastName"
                    type="text"
                    placeholder="LastName"
                    required onChange={(e)=> setLastname(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required onChange={(e)=> setPassword(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6">
                Signup
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </Wrapper>
  );
}
