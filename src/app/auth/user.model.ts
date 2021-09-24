export class User{
  constructor(
    public email:string|null,
    public id:string|null,
    private _token:string|null,
    private tokenExpirationDate:Date|null
  ){}

  get token(){
     if(!this.tokenExpirationDate || new Date > this.tokenExpirationDate){
       return null;
     }
     return this._token;
  }
}
