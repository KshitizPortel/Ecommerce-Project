import type { Status } from "../globals/types/types";
import type { Product } from "./producttypes";

export interface cartitem{
    Product:Product
}
export interface carttype{
    item:cartitem[],
    status:Status
}