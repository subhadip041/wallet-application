import { Heading } from "../components/Heading"
import { SubHeading } from '../components/Subheading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from "../components/BottomWarning"

export const SignUp = () => {
    return (
        <div className="bg-slate-200 sm:h-screen flex justify-center">
            <div className="flex flex-col justify-center px-6 py-2.5">
                <div className="rounded-lg bg-white sm:w-80 text-center p-2  px-4">
                    <Heading label={'Sign up'} />
                    <SubHeading label={'Enter your infromation to create an account'} />
                    <InputBox placeholder="John" label={"First Name"} type={"text"} />
                    <InputBox placeholder="cena" label={"Last Name"} type={"text"} />
                    <InputBox placeholder="jhon@email.com" label={"Email"} type={"email"} />
                    <InputBox placeholder="●●●●●●" label={"Password"} type={"password"} />
                    <Button label={'Signup'} />
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />            </div>
            </div>
        </div>
    )
}