import { useState } from "react"
import { useEffect } from "react";
import { Heading } from "../components/Heading"
import { SubHeading } from '../components/Subheading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from "../components/BottomWarning"

export const Signin = () => {
  
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signupHandle = ()=>{
        const signUppayload = {
            username: username,
            password: password
        }
        console.log(signUppayload)
    }
    return (
        <div className="bg-slate-200 sm:h-screen flex justify-center">
            <div className="flex flex-col justify-center px-6 py-2.5">
                <div className="rounded-lg bg-white sm:w-80 text-center p-2  px-4">
                    <Heading label={'Sign In'} />
                    <SubHeading label={'Enter your credentials to access your account'} />
                    <InputBox onChange={(e) => {setUsername(e.target.value);}}  value={username} placeholder="jhon@email.com" label={"Email"} name={"username"} type={"email"} />
                    <InputBox onChange={(e) => {setPassword(e.target.value);}} value={password} placeholder="●●●●●●" label={"Password"} name={"password"} type={"password"} />
                    <Button onClick={signupHandle} label={'Signin'} />
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}