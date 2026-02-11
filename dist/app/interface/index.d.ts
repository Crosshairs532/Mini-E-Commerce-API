import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}
//# sourceMappingURL=index.d.ts.map