import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export const generateToken = (
  payload: Record<string, any>,
  secret: string,
  time: any,
) => {
  const options: SignOptions = { expiresIn: time };

  const token = jwt.sign(payload, secret, options);
  return token;
};
