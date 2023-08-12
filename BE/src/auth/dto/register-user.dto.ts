import { IsString, Length } from "class-validator";


export class RegisterUsersDto {
     @IsString()
     @Length(5,10)
     username: string;
     
     @IsString()
     @Length(6,18)
     password: string
     
     // @IsString()
     // privateKey: string
     
     // @IsString()
     // publicKey:string
}