import { Link } from "react-router-dom"
import type { propsdata, userdatatype } from "./types"
import { useState, type ChangeEvent, type FormEvent } from "react"

const Form:React.FC<propsdata> = ({type,onsubmit}) => {

  const [userdata, setUserdata] = useState<userdatatype>({
    username:"",
    email:"",
    password:""
  })

  const handlechange=(e:ChangeEvent<HTMLInputElement>)=>
  {
    const {name,value}=e.target
    setUserdata({
      ...userdata,
      [name]:value
    })
  }

  const handlesubmit=(e:FormEvent<HTMLFormElement>)=>
  {
    e.preventDefault()
    const Userdata={
      username:userdata.username,
      email:userdata.email,
      password:userdata.password
    }
    onsubmit(Userdata)
  }
  return(
    <>
    <div className="min-h-screen flex align-center justify-center bg-gray-100">
      <div className="bg-white mt-10 h-150 w-225 p-6 rounded-xl shadow-lg flex overflow-hidden">
        <div className="w-1/2 bg-blue-500 p-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-2 text-white">Welcome to our platform</h1>
          <p className=" mb-2">Discover amazing products at best prices</p>
            <img
            className="w-full h-[85%] object-cover rounded-xl" 
            src="https://plus.unsplash.com/premium_photo-1680792152173-42a4572e3377?q=80&w=675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image">
            </img>
        </div>
        <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-center">
          {
            type==="register"?"Create an Account":"Welcome Back"
          }
         </h1>
        <p className="text-center text-gray-500 mt-2">
          {
            type==="register"?"Join our ecommerce platform":"Login to continue"
          }
          </p>
        <form onSubmit={handlesubmit}>
            <div className="mb-4">
              {
                type==="register"&&(
                  <div>
                  <label className="mb-2 block text-sm font-semibold">Name</label>
                  <input
                  className="w-full px-3 py-2 border border-gray-400 outline-none  rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  name="username"
                  value={userdata.username}
                  onChange={handlechange}
                  type="text" placeholder="Enter your name"
                  ></input>
                  </div>
                )
              }
              </div>
          <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold">Email</label>
                <input
                className="w-full px-3 py-2 border border-gray-400 outline-none  rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                name="email"
                value={userdata.email}
                onChange={handlechange}
                type="email" placeholder="Enter your email"
                ></input>
              </div>
          <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold">Password</label>
                <input
                className="w-full px-3 py-2 border border-gray-400 outline-none  rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                name="password"
                value={userdata.password}
                onChange={handlechange}
                type="password" placeholder="Enter your password"
                ></input>
              </div>
            <button
              className="w-full text-2xl font-semibold bg-blue-600 text-white rounded-lg py-1 hover:bg-blue-700 transition cursor-pointer" 
              type="submit">
                {
                  type==="register"?"Sign In":"Login"
                }
              </button>
        </form>
            <div>
                    <div>
                        <p className="mt-4 text-center text-sm font-semibold text-gray-500">
                          {
                            type==="register"?
                            (
                              <>
                          Already have an account {"  "}
                          <Link to="/login"><span className="text-blue-600 cursor-pointer">Login</span></Link>
                              </>
                            ):
                            (
                              <>
                              <Link to="/register"><span className="text-blue-600 cursor-pointer">Sign up to continue</span></Link>
                              </>
                            )
                          }
                        </p>
                    </div>
            </div>
        
        </div>
      </div>
    </div>
    </>
  
  )
}


export default Form