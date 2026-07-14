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
    khaltiurl:null | string
}