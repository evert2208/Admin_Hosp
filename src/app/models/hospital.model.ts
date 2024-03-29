
interface _hospitalUser {
  _id: string;
  nombre: string;
  img?: string;
}

export class Hospital {
  constructor(
    public nombre: string,
    public _id?: string | any,
    public usuario?: _hospitalUser,
    public img?: string | any
  ){ }
}
