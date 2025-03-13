export interface Order {
    empid: number;
    requireddate: string;
    shippeddate: string;
    shipname: string;
    shipaddress: string;
    shipcity: string;
}

export interface CreateOrderRequest {
    empid: number;
    shipperid: number;
    shipname: string;
    shipaddress: string;
    shipcity: string;
    shipcountry: string;
    orderdate: string;
    requireddate: string;
    shippeddate: string;
    freight: number;
    productid: number;
    unitprice: number;
    qty: number;
    discount: number;
  }