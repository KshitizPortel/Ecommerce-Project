
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

export interface verifytransactions
{
    pidx:string,
    total_amount:number,
    status:Status,
    transaction_is:string,
    fee:number,
    refunded:boolean
}

export enum Status
{
    Completed='Completed',
    Pending='Pending',
    Initiated='Initiated',
    Refunded='Refunded'
}

export enum Orderstatus {
    pending='pending',
    cancel='cancel',
    delivered='delivered',
    processing='processing',
    ontheway='on the way'
}