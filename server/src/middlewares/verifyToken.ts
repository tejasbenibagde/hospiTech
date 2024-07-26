import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
  patients: string[] | null;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is not provided." });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid." });
      }

      req.user = decoded as JwtPayload;
      next(); 
    }
  );
};

export { verifyToken };
