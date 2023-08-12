import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    validate(payload: {
        username: string;
    }): Promise<{
        id: string;
        username: string;
        password: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
}
export {};
