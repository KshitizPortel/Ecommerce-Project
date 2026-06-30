import { useEffect } from "react"
import Card from "../../../pages/cards/Card"
import { useAppdispatch, useAppselector } from "../../../store/hooks"
import { fetchproducts } from "../../../store/productslice"

const Main = () => {
  const dispatch=useAppdispatch()
  const {status,product}=useAppselector((state)=>state.products)
  useEffect(()=>
  {
    dispatch(fetchproducts())
  },[])
console.log(product,status)

  return (
    <div>
            <div className="relative w-full h-[80vh] overflow-hidden">
                <img 
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="image"></img>
                <div className="absolute inset-0 items-center bg-black/40">
                    <div className="text-white px-20 py-40">
                        <h1
                        className="text-6xl mb-10 font-bold"
                        >Big Sale is Live</h1>
                        <p
                        className="font-semibold mb-8 text-2xl"
                        >Upto 50% off on electronics and others</p>
                        <button
                        className="bg-orange-600 rounded-full cursor-pointer px-4 py-2 font-semibold "
                        type="button">Shop now</button>
                    </div>
                </div>
            </div>
            <div className="p-6 flex align-center flex-col justify-center bg-orange-50 ">
              <h1 className="font-bold text-4xl text-orange-600 text-center">Featured Products</h1>
              <div className="flex items-center justify-center gap-3 flex-wrap p-2 ">
                {
                  product.length>0 && product.map((prod)=>
                  {
                    return(
                      <Card key={prod.id} data={prod}/>
                    )
                  })
                }
              </div>
            </div>
    </div>
  )
}

export default Main
