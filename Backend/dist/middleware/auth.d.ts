import type { NextFunction, Request, Response } from 'express';
import User from '../models/User';
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare const authenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
