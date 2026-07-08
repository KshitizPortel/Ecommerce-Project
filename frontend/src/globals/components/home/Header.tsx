import { Link, useNavigate } from "react-router-dom"
import { useAppdispatch, useAppselector } from "../../../store/hooks"
import { useEffect, useState } from "react"
import { resetToken } from "../../../store/auth"

const Header = () => {
    const navigate=useNavigate()
    const dispatch=useAppdispatch()
    const {user}=useAppselector((state)=>state.auth)
    const [isloggedin, setIsloggedin] = useState<boolean>(false)
    useEffect(()=>
    {
        const token=localStorage.getItem("token")
        setIsloggedin(!!token||!!user.token)
    },[user.token])

    const handlelogout=()=>
    {
        localStorage.removeItem("token")
        dispatch(resetToken())
        setIsloggedin(false)
        console.log("before navigating",window.location.pathname)
        navigate("/login")
        console.log(window.location.pathname)
    }
    const {item,status}=useAppselector((state)=> state.carts)
    console.log(item.length)
  return (
    <div>
        <header className="bg-orange-600 text-white flex items-center h-16 px-10 justify-between">
            {/* logo */}
           <Link to='/'>
            <div className="text-xl font-bold cursor-pointer">Logo</div>
           </Link>

            {/* middle */}
            <div className="flex flex-1 justify-center">
                <div className="w-full max-w-xl flex">
                    <input
                    className="outline-none border-2 border-gray-200 not-last:px-6 py-2 rounded-l-md w-full text-white font-semibold" 
                    type="text" placeholder="Search Products"></input>
                    <button 
                    className="bg-white text-orange-700 px-4 py-2 rounded-r-md cursor-pointer"
                    type="button">Search</button>
                </div>
            </div>
            
            {/* auth */}
            <div className="flex items-center gap-6">
                {
                    !isloggedin?
                    (
                        <>
                        <Link to="/login">
                        <button
                        className="border-2 px-6 py-1 rounded-2xl cursor-pointer" 
                        type="button">Login</button>
                        </Link>
                        <Link to="register">
                        <button
                        className="border-2 px-6 py-1 rounded-2xl cursor-pointer" 
                        type="button">Sign up</button>
                        </Link>
                        </>
                    ):
                    (
                        <>
                        <Link to="/cart">
                        <button
                        className="border-2 px-6 py-1 rounded-2xl cursor-pointer" 
                        type="button">Cart<sup>{item.length}</sup></button>
                        </Link>
                        <button
                        onClick={handlelogout}
                        className="border-2 px-6 py-1 rounded-2xl cursor-pointer" 
                        type="button">Log out</button>
                        </>
                    )
                }
            </div>
        </header>
    </div>
  )
}

export default Header
