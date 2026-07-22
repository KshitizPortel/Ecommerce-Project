import Header from "../../../globals/components/home/Header"
import { useAppdispatch, useAppselector } from "../../../store/hooks"
import { getorderdetails } from "../../../store/checkoutslice"
import { useEffect, useState } from "react"
import  { myorderstatus } from "../../../types/checkouttype"

const Myorder = () => {

  const dispatch=useAppdispatch()
  const {orderdata}=useAppselector((state)=>state.order)
  console.log(orderdata[0]?.totalamt)
  useEffect(()=>
  {
    dispatch(getorderdetails())
  },[])

  const [orderstatus, Setorderstatus] = useState<myorderstatus>(myorderstatus.All)
  const [inputchange, Setinputchange] = useState<string>('')
  const [datechange, Setdatechange] = useState<string>('')

  console.log(datechange)
  // const filtereddata=orderdata.filter((data)=>
  // {
  //   if(orderstatus==myorderstatus.All||orderstatus==data.orderstatus)
  //     return true
      
  // })

  const filtereddata=orderdata.filter((data)=>orderstatus==myorderstatus.All||orderstatus==data.orderstatus)
  .filter((mydata)=> mydata.Payment.paymentstatus.toLowerCase().includes(inputchange)||mydata.id.toLowerCase().includes(inputchange)
  ||mydata.orderstatus.toLowerCase().includes(inputchange)||mydata.totalamt.toString().includes(inputchange))
  .filter((mydata)=> datechange==''|| new Date(mydata.createdAt).toLocaleDateString()==new Date(datechange).toLocaleDateString())
  return (
    <>
    <Header/>
    <div className="w-screen min-h-screen bg-orange-50 p-10">
      <div>
        <h1 
        className="font-bold text-2xl mb-2.5"
        >My Orders</h1>

        <div className="flex items-center gap-5 mb-5 w-1/2">
          <select
          onChange={(e)=>
          {
            Setorderstatus(e.target.value as myorderstatus)
          }
          }
          className="border rounded p-1.5 font-semibold">
            <option value={myorderstatus.All}>All</option> 
            <option value={myorderstatus.Pending}>Pending</option>
            <option value={myorderstatus.Ontheway}>On the Way</option>
            <option value={myorderstatus.Delivered}>Delivered</option>
            <option value={myorderstatus.Cancel}>Cancelled</option>
            <option value={myorderstatus.Processing}>Processing</option>
          </select>

          <input
          onChange={(e)=>
          {
            Setinputchange(e.target.value)
          }
          }
          className="border rounded p-1.5 outline-0" 
          type="text" placeholder="search"></input>

          <input
          onChange={(e)=>
          {
            Setdatechange(e.target.value)
          }
          }
          className="border p-1.5 rounded" 
          type="date"></input>
        </div>
      </div>

      <div className="pt-5">
        <table
        className="w-full bg-white"
        >
          <thead className=" rounded bg-blue-100">
            <tr>
              <th>Order id</th>
              <th>Payment amount</th>
              <th>Payment status</th>
              <th>Order Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {
              filtereddata.length>0 && filtereddata.map((data)=>
              {
                return(
              <tr key={data.id} >
                <td>{data.id}</td>
                <td>{data.totalamt}</td>
                <td>{data.Payment.paymentstatus}</td>
                <td>{data.orderstatus}</td>
                <td>{new Date(data.createdAt).toLocaleDateString()}</td>
              </tr>
                )
              })
            }
          </tbody>

        </table>
      </div>
    </div>
    </>
  )
}

export default Myorder
