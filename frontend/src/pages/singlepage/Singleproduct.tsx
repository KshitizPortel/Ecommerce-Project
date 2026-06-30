// import React from 'react'
import { useEffect, useState } from 'react'
import watch from '../../assets/watch.jpg'
import Header from "../../globals/components/home/Header"
import { useAppdispatch, useAppselector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { fetchproductbyid } from '../../store/productslice'

const Singleproduct = () => {
    const {id}=useParams()
    const dispatch=useAppdispatch()
    const {status,singleproduct}=useAppselector((state)=>state.products)

        useEffect(()=>
        {
            if(id){
            dispatch(fetchproductbyid(id))
            }
        },[])
    const [count, setCount] = useState(singleproduct?.Stock ??0)
    const increase=()=>
    {
        setCount(count+1)
    }
    const decrease=()=>
    {
        if(count>0)
        {
        setCount(count-1)
        }
    }
    console.log(status)
  return (
    <>
    <Header/>
    <div className="w-screen h-screen bg-orange-50 flex items-start justify-center p-10">
       <div className="w-200 h-130 bg-white flex rounded-2xl  gap-6">
            <div className="max-w-80 p-2.5 shrink-0">
                <img
                className="max-w-full h-90 object-cover" 
                src={watch}></img>
            </div>
            <div className="flex max-w-full flex-col gap-6 p-5 flex-start">
                <h1 className="font-bold text-3xl">Product Name: {singleproduct?.ProductName}</h1>
                <p className="font-semibold text-2xl">Catergory:{singleproduct?.Catergory.CatergoryName}</p>
                <p className="font-semibold text-2xl">price:{singleproduct?.Price}</p>
                <div className="flex items-center gap-3">
                    <p className="font-semibold text-2xl">Quantity:</p>
                    <button
                    className="outline-none bg-gray-200 px-2 rounded cursor-pointer font-semibold text-2xl"
                    onClick={decrease}
                    >-</button>
                    <p
                    className="font-semibold"
                    >{count}</p>
                    <button
                    className="outline-none bg-gray-200 px-2 rounded cursor-pointer font-semibold text-2xl"
                    onClick={increase}
                    >+</button>
                </div>
                <div>
                    <h4
                    className="font-semibold text-2xl"
                    >Product Description:</h4>
                    <p className="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste a, accusamus nostrum velit modi voluptatum ullam atque tenetur. Itaque ullam aut minus! Possimus, earum hic quas accusantium sunt praesentium deserunt.</p>
                </div>
                <div className="flex items-center justify-center gap-10 pt-6">
                    <button
                    className="font-semibold bg-orange-500 text-white p-3 rounded cursor-pointer"
                    >Buy Now</button>
                    <button
                    className="font-semibold bg-orange-700 text-white p-3 rounded cursor-pointer"
                    >Add to cart</button>
                </div>
            </div>
        </div>  
    </div>
    </>
  )
}

export default Singleproduct
