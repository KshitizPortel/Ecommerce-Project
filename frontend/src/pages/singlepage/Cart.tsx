import watch  from "../../assets/watch.jpg"
import Header from "../../globals/components/home/Header"
import { useAppdispatch, useAppselector } from "../../store/hooks"
import { deletecartitem, updatecartitem } from "../../store/cartslice"
import { Link } from "react-router-dom"

const Cart = () => {
  const dispatch=useAppdispatch()
  const {item}=useAppselector((state)=>state.carts)
  console.log(item)
  
  const handledelete=(productid:string)=>
  {
    dispatch(deletecartitem(productid)) 
  }

  const handleupdate=(productid:string,quantity:number)=>
  {
    dispatch(updatecartitem(productid,quantity))
  }

  const totalcartitem=item.reduce((total,singleitem)=>singleitem.Product.Stock+total,0)
  const totalprice=item.reduce((total,singleitem)=>singleitem.Product.Price*singleitem.Product.Stock+total,0)
  return (
    <>
    <Header/> 
    <div className="flex flex-col w-screen mi-h-screen bg-gray-50 items-center">
      <h1 className="font-bold text-2xl mb-20">Shopping Cart</h1>
      <div className="flex gap-12">
        <div className="flex flex-col gap-5">
      {
          item.length>0 && item.map((data)=>{
            return(
                <div  key={data?.Product?.id} className="flex bg-white w-150 rounded-2xl p-3 gap-10">
                <div className="w-40 p-2">
                  <img className="w-full object-cover" src={watch}>
                  </img>
                </div>
                <div className="flex  flex-col items-center justify-center">
                  <h1 className="font-bold text-2xl">{data?.Product?.ProductName}</h1>
                  <p className="font-semibold text-1xl">{data?.Product?.ProductDescription}</p>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                  <div className="flex gap-4 items-center justify-center">
                    <p
                    onClick={()=>handleupdate(data?.Product.id,(data?.Product?.Stock)-1)} 
                    className="px-2 bg-gray-100 rounded cursor-pointer font-semibold">-</p>
                    <p className="px-2 rounded cursor-pointer font-semibold min-w-10 text-center">{data?.Product?.Stock}</p>
                    <p
                    onClick={()=>handleupdate(data?.Product.id,(data?.Product?.Stock)+1)} 
                    className="px-2 bg-gray-100 rounded cursor-pointer font-semibold">+</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="px-2 rounded cursor-pointer font-semibold">${data?.Product?.Price}</p>
                    <button
                    onClick={()=>handledelete(data?.Product?.id)} 
                    className="bg-orange-500 text-white font-semibold rounded p-2 cursor-pointer">cancel order</button>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      <div className="bg-white w-90 rounded p-5 max-h-60 flex flex-col justify-center">
        <div className="flex justify-between ">
        <div className="flex items-start flex-col gap-1.5">
            <p>Total items</p>
            <p>Subtotal</p>
            <p>Shipping</p>
            <p className="font-bold">Total</p>
          </div>
          <div className="items-end flex flex-col gap-1.5">
            <p>{totalcartitem}</p>
            <p>{totalprice}</p>
            <p>$5</p>
            <p className="font-bold">${totalprice+5}</p>
            <span className="text-sm font-semibold text-gray-800">Including VAT</span>
          </div>
        </div>
        <Link to="/checkout">
          <button
          className="bg-blue-600 cursor-pointer p-2 rounded text-white font-semibold w-full mt-4" 
          type="submit">Check out</button>
          </Link>
      </div>
      </div>

    </div>
    </>
  )
}

export default Cart
