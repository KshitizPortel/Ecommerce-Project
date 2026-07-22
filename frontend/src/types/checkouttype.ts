
import type { Product } from "./producttypes"

export enum PaymentMethod
{
    COD='cod',
    KHALTI='khalti'
}

interface itemdetails
{
    productid:string,
    quantity:number
}

export interface orderdataitem extends itemdetails
{
    orderid:string
}

export default interface orderdetails
{
    phonenumber:string,
    shippingaddr:string,
    totalamt:number,
    paymentdetails:
    {
        paymentmethod:PaymentMethod
    },
    items:itemdetails[]
}

export  interface checkoutdetails
{
    item:orderdataitem[],
    status:string,
    khaltiurl:null | string,
    orderdata:myorderdetails[],
    myorderdetails:myorderdatadetails[]
}

enum Paymentstatus
{
    Paid='paid',
    Unpaid='unpaid'
}
interface PaymentDetail 
{
    paymentstatus:Paymentstatus
}
export interface myorderdetails
{
        id:string,
        orderstatus:string,
        totalamt:number,
        Payment:PaymentDetail,
        createdAt:string
}


export enum myorderstatus
{
    Pending='pending',
    Cancel='cancel',
    Delivered='delivered',
    Processing='processing',
    Ontheway='ontheway',
    All='all'
}

interface myorderddata 
{
    id:string,
    phonenumber:number,
    totalamt:number,
    orderstatus:myorderstatus,
    shippingaddr:string
    Payment:{
        paymentmethod:PaymentMethod,
        paymentstatus:Paymentstatus
    }
}
interface myorderproduct
{
    Productname:string,
    Price:number,
}
export interface myorderdatadetails
{
    Product:myorderproduct,
    Quantity:number,
    Order:myorderddata,
}

// {
//     "message": "Order fetched sucessfully",
//     "data": [
//         {
//             "id": "4b5827a5-2302-41fc-95ec-6e47edc92ba4",
//             "Quantity": 3000,
//             "createdAt": "2026-07-20T15:28:06.000Z",
//             "updatedAt": "2026-07-20T15:28:06.000Z",
//             "orderId": "1481cc3f-3b47-4899-bd49-60c54b796943",
//             "productId": "918de621-0a10-49ff-80af-b0cca268a4ff",
//             "Product": {
//                 "Productname": "Refrigerator",
//                 "ProductDescription": "Baltra",
//                 "Price": 150,
//                 "Stock": 3000
//             },
//             "Order": {
//                 "id": "1481cc3f-3b47-4899-bd49-60c54b796943",
//                 "phonenumber": "9800002345",
//                 "shippingaddr": "Veniam ea quis simi",
//                 "totalamt": 450000,
//                 "orderstatus": "pending",
//                 "createdAt": "2026-07-20T15:28:06.000Z",
//                 "updatedAt": "2026-07-20T15:28:06.000Z",
//                 "paymentid": "4347a11d-e365-424c-816a-905ecc5fa405",
//                 "userId": "c58e4e08-f9f6-4e93-a6f6-6397fed537a5",
//                 "Payment": {
//                     "id": "4347a11d-e365-424c-816a-905ecc5fa405",
//                     "pidx": null,
//                     "paymentmethod": "COD",
//                     "paymentstatus": "unpaid",
//                     "createdAt": "2026-07-20T15:28:06.000Z",
//                     "updatedAt": "2026-07-20T15:28:06.000Z"
//                 }
//             }
//         }
//     ]
// }