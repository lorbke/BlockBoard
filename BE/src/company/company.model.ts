import { Prisma } from "@prisma/client";


export class Company implements Prisma.CompanyCreateInput {
    username: string;
    password: string;
    privateKey: string;
    publicKey: string;
}