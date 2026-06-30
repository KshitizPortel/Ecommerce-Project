import type { Status } from "../globals/types/types"

interface User
{
    username:string,
    email:string
}

interface Catergory
{
    CatergoryName:string
}
export interface Product
{
    id:string,
    ProductName:string,
    ProductDescription:string,
    Price:number,
    Stock:number,
    Imageurl:string,
    createdAt:string,
    updatedAt:string,
    UserId:string,
    Catergoryid:string,
    User:User,
    Catergory:Catergory
}

export interface Productstate
{
    product:Product[],
    status:Status,
    singleproduct:Product |null
}