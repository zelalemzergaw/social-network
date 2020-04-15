export class Advertisement {
    _id:number;
    description:String;
    target:{
        age:{
            min:number;
            max:number;
        }
        location:String
    }
}