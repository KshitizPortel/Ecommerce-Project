import Form from "../Form"
import type { userdatatype } from "../types"
import { register, resetStatus } from "../../../store/auth"
import { useAppdispatch, useAppselector } from "../../../store/hooks"
import { useEffect } from "react"
import { Status } from "../../../globals/types/types"
import { useNavigate } from "react-router-dom"
// import {register} from '.../store/auth.ts'

const Register = () => {
  const navigate=useNavigate()
  const dispatch=useAppdispatch()
  const {status}=useAppselector((state)=>state.auth)
  const handleregister=(data:userdatatype)=>
  {
    console.log(data)
    dispatch(register(data))
  }
  useEffect(()=>
  {
    if(status==Status.SUCESS)
    {
      dispatch(resetStatus())
      navigate("/login")
    }
  },[status,navigate,dispatch])
  return (
    <div>
      <Form type="register" onsubmit={handleregister}/>
    </div>
  )
}

export default Register
