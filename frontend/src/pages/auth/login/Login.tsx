import { useEffect } from "react"
import { login, resetStatus } from "../../../store/auth"
import { useAppdispatch, useAppselector } from "../../../store/hooks"
import Form from "../Form"
import type { userlogintype } from "../types"
import { Status } from "../../../globals/types/types"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useAppdispatch()
  const {status}=useAppselector((state)=>state.auth)
  const handlelogin=(data:userlogintype)=>
  {
    console.log(data)
    dispatch(login(data))
  }
  useEffect(()=>
  {
    if(status==Status.SUCESS)
    {
      dispatch(resetStatus())
      navigate("/")
    }
  },[status,navigate,dispatch])
  return (
    <div>
      <Form type="login" onsubmit={handlelogin}/>
    </div>
  )
}

export default Login
