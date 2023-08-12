import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express';
import { RegisterUsersDto } from "./dto/register-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: Request, response: Response, loginDto: LoginDto): Promise<any>;
    register(request: Request, response: Response, registerDto: RegisterUsersDto): Promise<any>;
}
