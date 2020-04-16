import { Role } from "./role";


export class User {
  _id: number;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  location: string;
  role: Role;
  access_token?: string;
  following: any[];
}
