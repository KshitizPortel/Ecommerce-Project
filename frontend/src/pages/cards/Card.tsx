// import watch from '../../assets/watch.jpg'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/types'
interface Cardprops
{
  data:Product
}
const Card:React.FC<Cardprops> = ({data}) => {
  return (
    <>
    <Link to={`/products/${data.id}`}>
      <div>
              <div className="flex flex-col bg-white rounded-2xl h-90 w-80 m-2 p-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="h-56 w-full flex items-start justify-center">
                  <img
                  className="max-w-full max-h-full object-contain" 
                  src={data.Imageurl}></img>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                  <h2
                  className="font-bold text-2xl"
                  >{data.ProductName}</h2>
                  <p
                  className="font-semibold text-1xl"
                  >Price: ${data.Price}</p>
                  <button
                  className="font-semibold outline-none bg-orange-600 text-white p-2 px-4 rounded-2xl cursor-pointer"
                  >Add to cart</button>
                </div>
              </div>
          </div>
    </Link>
    </>
  )
}

export default Card
  