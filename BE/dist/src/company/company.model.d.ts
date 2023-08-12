import { Prisma } from "@prisma/client";
export declare class Company implements Prisma.CompanyCreateInput {
    username: string;
    password: string;
    privateKey: string;
    publicKey: string;
}
