import { useEffect, useState, type ChangeEvent } from 'react'
import watch from '../../../assets/watch.jpg'
import Header from '../../../globals/components/home/Header'
import { useAppdispatch, useAppselector } from '../../../store/hooks'
import type orderdetails from '../../../types/checkouttype'
import { PaymentMethod } from '../../../types/checkouttype'
import { checkoutdata } from '../../../store/checkoutslice'
import { useNavigate } from 'react-router-dom'
import { Status } from '../../../globals/types/types'
const Checkout = () => {
    const navigate=useNavigate()
    const dispatch=useAppdispatch()
    const {item}=useAppselector((state)=>state.carts)
    const {khaltiurl,status}=useAppselector((state)=>state.order)
    const [method, setMethod] = useState(PaymentMethod.COD)
    const [data, setData] = useState<orderdetails>({
        phonenumber:"",
        shippingaddr:"",
        totalamt:0,
        paymentdetails:{
            paymentmethod:PaymentMethod.COD
        },
        items:[]
    })
    console.log("data",data)
    const handlechange=(e:ChangeEvent<HTMLInputElement>)=>
    {
        const {name,value}=e.target
        setData({
            ...data,
            [name]:value
        })
    }
    const subtotal=item.reduce((total,newdata)=>newdata?.Product?.Price*newdata?.Product?.Stock +total,0)
    const handlesubmit=async (e:ChangeEvent<HTMLFormElement>)=>
    {
        e.preventDefault()
        const itemdata=item.map((newdata)=>
        {
            return{
                productid:newdata?.Product?.id,
                quantity:newdata?.Product?.Stock
            }
        })
        const orderdata={
            ...data,
            paymentdetails:{
                paymentmethod:method
            },
            items:itemdata,
            totalamt:subtotal
        } 
        console.log(orderdata) 
        await dispatch(checkoutdata(orderdata))
        // console.log(khaltiurl)
        if(khaltiurl)
        {
            window.location.href=khaltiurl
        }
    }

    useEffect(()=>
     {
        if(status==Status.SUCESS)
        {
            alert("Your order is placed sucessfully")
            // navigate("/")
        }
    },[status,dispatch])

  return (
    <>
    <Header/>
    <div className="w-screen min-h-screen flex items-center justify-center bg-orange-50 gap-15 rounded">
        <div className="w-1/3 flex flex-col items-center bg-white  m-6 p-6 rounded gap-12">
            <div className="flex flex-col w-full">
                <h1 className="font-bold text-2xl">Order Summary</h1>
                <p className="text-gray-800">Chekout your items. And select the shipping method.</p>
            </div>
            {
                item.length>0 && item.map((data)=>
                {
                    return(
                    <div  key={data?.Product?.id} className="flex gap-10 w-full p-1">
                        <div className="w-35 rounded p-1 bg-gray-100">
                            <img 
                            className="w-full object-cover"
                            src={watch}></img>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                            <h1 className="font-bold text-2xl">{data?.Product?.ProductName}</h1>
                            <p className="font-semibold">Qty:{data?.Product?.Stock} </p>
                            <h1 className="font-semibold">Price: ${data?.Product?.Price}</h1>
                        </div>
                    </div>
                    )
                })
            }
            
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        Payment Method
      </h1>
      <div className="flex flex-col gap-4">
        <button 
        value={PaymentMethod.COD}
        className={`border-2 rounded-xl hover:border-blue-500 hover:shadow cursor-pointer transition-all duration-100 ease-out p-4 font-bold
            ${
                method=="cod"
                ?"border-blue-400 bg-blue-400 text-white"
                :"border-gray-300 hover:border-blue-400"
            }
            `}
        type="button" onClick={()=>setMethod(PaymentMethod.COD)}>
            Cash On Delivery
        </button>
        <button 
        value={PaymentMethod.KHALTI}
        className={`border-2 rounded-xl hover:border-blue-500 hover:shadow cursor-pointer transition-all duration-300 ease-out p-4 font-bold
            ${
                method=="khalti"
                ?"border-blue-400 bg-blue-400 text-white"
                :"border-gray-300 hover:border-blue-400"
            }
            `}
        type="button" onClick={()=>setMethod(PaymentMethod.KHALTI)}>
            Khalti (Online)
        </button>

      </div>
    </div>

        </div>

        <div className="w-1/3 bg-gray-50 p-5 rounded">
            <div className="flex flex-col gap-2 mb-3">
                <h1 className="text-2xl font-bold">Payment Details</h1>
                <p className="font-semibold">Complete your order by providing your payment details</p>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
                <div className="flex flex-col gap-2 w-full">
                    <label
                    className="font-semibold"
                    htmlFor="phone">Phone Number:</label>
                    <input
                    onChange={handlechange} 
                    className="border border-gray-400 rounded p-2.5 outline-none"
                    type="text" placeholder="Enter your phone number" name="phonenumber" value={data.phonenumber}></input>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label
                    className="font-semibold"
                    htmlFor="address">Shipping Address:</label>
                    <input
                    onChange={handlechange} 
                    className="border border-gray-400 rounded p-2.5 outline-none"
                    type="text" placeholder="Enter your address" name="shippingaddr" value={data.shippingaddr}></input>
                </div>

            <div className="flex justify-between font-semibold mt-2.5 bg-white p-4 rounded">
                <div className="flex flex-col gap-1">
                    <p>Subtotal</p>
                    <p>Shipping charge</p>
                    <p className="font-bold text-2xl mt-2">Total</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p>${subtotal}</p>
                    <p>$10</p>
                    <p className="font-bold text-2xl mt-2">${subtotal+10}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-2">
                {
                    method===PaymentMethod.KHALTI 
                    ?(
                    <button 
                    className="bg-purple-500 text-white font-semibold p-4 rounded w-full cursor-pointer"
                    type="submit">Pay With Khalti</button>
                    ):
                    (
                    <button 
                    className="bg-blue-500 text-white font-semibold p-4 rounded w-full cursor-pointer"
                    type="submit">Place Order</button>
                    )
                }   
            </div>
            </form>
            </div>
    </div>
    </>
  )
}
export default Checkout
