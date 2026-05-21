
export interface OrderData
{
    phonenumber:string,
    shippingaddr:string,
    totalamt:number,
    paymentdetails:{
        paymentmethod:PaymentMethod,
        paymentstatus?:PaymentStatus,
        paymentid?:string
    },
    items:OrderDetails[]
}

interface OrderDetails
{
    quantity:number,
    productid:string
}
export enum PaymentMethod
{
    COD='cod',
    Khalti='khalti'
}

enum PaymentStatus
{
    Paid='paid',
    Unpaid='unpaid'
}

export interface Khalti
{
    pidx:number,
    payment_url:string,
    expires_at:string,
    expires_in:number
}