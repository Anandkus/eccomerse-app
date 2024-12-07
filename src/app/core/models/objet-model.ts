export class user {
    name!: string;
    mobileNo!: string;
    age!: number;
    dob!: string;
    email!: string;
    password!: string;
    address!: address ;
    language!: [] ;
    gender!: string;
    aboutyou!: string;
    uploadphoto!: string;
    agreetc!: boolean;
    role!: string;
   // id!: number;

}
export class address {
    addLine1!: string;
    addLine2!: string;
    city!: string;
    state!: string;
    zipcode!: number;
    id!: number;
}
export class product {
    id!:string;
    name!: string;
    uploadphoto!: string;
    desc!: string;
    mrp!: number
    dp!: number
    status:any;
}
export class order {
    id!: number;
    userid!: number;
    sellerid!: number;
    product!: product;
    deliveryaddress!: address;
    contact!: number;
    dateTime!: string;
}