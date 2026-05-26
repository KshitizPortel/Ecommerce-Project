import { useState } from "react"

type propsdata={
  type:"login"|"register"
}
const Form = ({type}:propsdata) => {
  const [formdata,setFormdata]=useState({
    name:'',
    email:'',
    password:''
  })
  const isregister=(type==='register')

  const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>
  {
    setFormdata({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }

  const handlesubmit=(e:React.FormEvent)=>
  {
    e.preventDefault()
    if(isregister)
    {
      console.log("registration form",formdata)
    }
    else{
      console.log("login form")
      console.log({
        email:formdata.email,
        password:formdata.password
      })
    }
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
          {isregister?'Create Account':'Welcome Back'}</h1>
        <p className="text-center text-gray-500 mt-2">
          {isregister?'Join our ecommerce platform':'Login to continue'}</p>
        <form onSubmit={handlesubmit}>
      <div className="mb-4">
        {isregister &&(
          <div>
          <label className="mb-2 block text-sm font-semibold">Name</label>
          <input
           className="w-full px-3 py-2 border border-gray-400 outline-none  rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
           name="name"
           value={formdata.name}
           onChange={handlechange}
           type="text" placeholder="Enter your name"
          ></input>
          </div>
        )}
        </div>
     <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold">Email</label>
          <input
           className="w-full px-3 py-2 border border-gray-400 outline-none  rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
           name="email"
           value={formdata.email}
           onChange={handlechange}
           type="email" placeholder="Enter your email"
          ></input>
        </div>
     <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold">Password</label>
          <input
           className="w-full px-3 py-2 border border-gray-400 outline-none  rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
           name="password"
           value={formdata.password}
           onChange={handlechange}
           type="password" placeholder="Enter your password"
          ></input>
        </div>
      <button
        className="w-full text-2xl font-semibold bg-blue-600 text-white rounded-lg py-1 hover:bg-blue-700 transition cursor-pointer" 
        type="submit">
            {isregister?'Register':'Login'}
        </button>
        </form>
            <div>
                {isregister &&(
                    <div>
                        <p className="mt-4 text-center text-sm font-semibold text-gray-500">
                        Already have an account {"  "}
                        <span className="text-blue-600 cursor-pointer">Login</span>
                        </p>
                    </div>
                )}
            </div>
        
        </div>
      </div>
    </div>
    </>
  
  )
}


export default Form
