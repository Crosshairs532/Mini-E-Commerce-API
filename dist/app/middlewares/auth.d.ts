import { NextFunction, Request, Response } from "express";
declare const Auth: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export default Auth;
//# sourceMappingURL=auth.d.ts.map