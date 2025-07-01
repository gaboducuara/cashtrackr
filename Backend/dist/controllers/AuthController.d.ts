import type { Request, Response } from 'express';
export declare class AuthController {
    static createAccount: (req: Request, res: Response) => Promise<void>;
    static readonly ConfirmedAccount: (req: Request, res: Response) => Promise<void>;
    static Login: (req: Request, res: Response) => Promise<void>;
    static forgotPassword: (req: Request, res: Response) => Promise<void>;
    static validateToken: (req: Request, res: Response) => Promise<void>;
    static resetPasswordWithToken: (req: Request, res: Response) => Promise<void>;
    static user: (req: Request, res: Response) => Promise<void>;
    static updateCurrencyUserPassword: (req: Request, res: Response) => Promise<void>;
    static checkpassword: (req: Request, res: Response) => Promise<void>;
    static updateUser: (req: Request, res: Response) => Promise<void>;
}
