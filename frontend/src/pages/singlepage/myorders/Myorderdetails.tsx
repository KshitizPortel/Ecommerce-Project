import Header from "../../../globals/components/home/Header"
import watch from '../../../assets/watch.jpg'
import { useAppdispatch, useAppselector } from "../../../store/hooks"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getmyorderdetails } from "../../../store/checkoutslice"
const Myorderdetails = () => {

    const dispatch=useAppdispatch()
    const {id}=useParams()
    const {myorderdetails}=useAppselector((state)=>state.order)
    useEffect(()=>
    {
        if(id)
        {
            dispatch(getmyorderdetails(id))
        }
    },[])
    console.log(myorderdetails)
    console.log(myorderdetails[0]?.Product?.Productname)
    console.log(id)
  return (
    <>
    <Header/>
    <div className="min-h-screen w-screen bg-orange-50 p-10">
        <div className="w-full flex gap-5">
            <div className="w-2/3 bg-white p-4 m-4">
            <h1 
            className="font-bold text-3xl text-orange-700 text-center mb-3"
            >My Orders</h1>
            {
                myorderdetails.length>0 && myorderdetails.map((orderdata)=>
                {
                    return(
                        <div  key= {orderdata?.Order?.id} className="flex justify-between items-center bg-gray-100 m-2 rounded">
                            <div
                                className="flex items-center gap-5"
                                >
                                    <img
                                    className="w-40 object-cover p-1"
                                    src={watch}></img>
                                    <h1
                                    className="font-bold text-3xl"
                                    >{orderdata?.Product?.Productname}</h1>
                            </div>

                            <div className="flex gap-10 font-semibold text-2xl px-5">
                                <p>Price:${orderdata?.Product?.Price}</p>
                                <p>Qty:{orderdata?.Quantity}</p>
                                <p>Total:${orderdata?.Quantity * orderdata?.Product?.Price}</p>
                            </div>
                    </div>
                    )
                })
            }
            
            </div>
            <div className="w-1/3 bg-white p-4 m-4 gap flex flex-col items-center gap-4">
            <h1 className="font-bold text-3xl">Customer Details</h1>
            <div className=" flex flex-col gap-5 font-semibold">
                <p >Address:  {myorderdetails[0]?.Order?.shippingaddr}</p>
                <p>Phone number:  {myorderdetails[0]?.Order?.phonenumber}</p>
                <div className="flex gap-5 mt-4">
                    <button 
                    className="bg-blue-500 text-white p-3 rounded cursor-pointer font-semibold"
                    type="button">Edit Order</button>
                    <button 
                    className="bg-orange-500 text-white p-3 rounded cursor-pointer font-semibold"
                    type="button">Place Order</button>
                </div>
                <button
                className="bg-red-500 mt-5 text-white font-semibold crusor-pointer  w-full p-2 rounded"
                 type="button">Delete Order</button>
            </div>

            </div>
        </div>

        
            <div className="flex gap-10 m-4 text-gray-800 ">
                <div className="bg-white w-100 rounded p-4">
                    <h1 className="font-bold text-2xl text-center text-orange-600">Summary</h1>
                    <div className="flex justify-between items-center font-semibold p-2">
                        <div className="text-gray-500">
                            <p>Payment Method</p>
                            <p>Payment Status</p>
                            <p>Order Status</p>
                        </div>
                        <div>
                            <p>{myorderdetails[0]?.Order?.Payment?.paymentmethod}</p>
                            <p>{myorderdetails[0]?.Order?.Payment?.paymentstatus}</p>
                            <p>{myorderdetails[0]?.Order?.orderstatus}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white w-100 rounded p-4 ">
                    <h1 className="font-bold text-2xl text-center text-orange-600">Shipping</h1>
                    <div className="flex items-center justify-between p-2">
                        <div>
                            <p className="font-semibold">Delivery charge</p>
                            <p className="text-sm">Delivery with in 24 hours</p>
                        </div>
                        <div>
                            <p>$10</p>
                        </div>
                    </div>
                </div>
            </div>
        <div>

        </div>
    </div>
    </>
  )
}
export default Myorderdetails
