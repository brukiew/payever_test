export class User{
    public id:number;
    public email:string;
    public firstName:string;
    public lastName:string;
    public avatar:string;

    constructor(data:any){
        const {id, email, first_name:firstName, last_name:lastName, avatar} = data;
        Object.assign(this, {id, email, firstName, lastName, avatar});
    }
}
