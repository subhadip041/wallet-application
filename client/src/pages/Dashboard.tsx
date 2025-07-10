import { Wrapper } from "@/components/layout/Wrapper"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/userStore"
import { useNavigate } from "react-router-dom"

export const Dashboard = ()=>{
const logOut = useUserStore((state) => state.logout)
const navigate = useNavigate()

const onClickLogOut = async ()=>{
    await logOut()
    navigate('/signin')
}

return(
    <div>
        <Wrapper>
            <h1>
                Dashboard
            </h1>
            <Button onClick={onClickLogOut}>Logout</Button>
        </Wrapper>
    </div>
)

}