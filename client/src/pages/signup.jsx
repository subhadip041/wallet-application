import { useState } from "react"
import { Heading } from "../components/Heading"
import { SubHeading } from '../components/Subheading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from "../components/BottomWarning"
import axios from 'axios';
import { useNavigate } from "react-router-dom"


export const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const signUpPayload = {
        "username": username,
        "password": password,
        "firstname": firstName,
        "lastname": lastName,

    } 

    const onChangeHandler = async()=>{
        try {
            const response = await axios.post(`${apiUrl}/user/signup`, signUpPayload);
            console.log(response.data)
            localStorage.setItem('token', response.data.token )
            navigate("/dashboard")
            
        } catch (error) {
            if (error.response) {
                console.error("Error:", error.response.status, error.response.data);
              } else {
                console.error("Error:", error.message);
              }
            
        }
    }



    return (
        <div className="bg-slate-200 sm:h-screen flex justify-center">
            <div className="flex flex-col justify-center px-6 py-2.5">
                <div className="rounded-lg bg-white sm:w-80 text-center p-2  px-4">
                    <Heading label={'Sign up'} />
                    <SubHeading label={'Enter your infromation to create an account'} />
                    <InputBox onChange={(e) => {setFirstname(e.target.value);}} value={firstName} placeholder="John" label={"First Name"} type={"text"} />
                    <InputBox onChange={(e) => {setLastname(e.target.value);}} value={lastName} placeholder="cena" label={"Last Name"} type={"text"} />
                    <InputBox onChange={(e) => {setUsername(e.target.value);}} value={username} placeholder="jhon@email.com"  label={"Email"} type={"email"} />
                    <InputBox onChange={(e) => {setPassword(e.target.value);}} value={password} placeholder="●●●●●●"  label={"Password"} type={"password"} />
                    <Button onClick={onChangeHandler} label={'Signup'} />
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />            </div>
            </div>
        </div>
    )
}