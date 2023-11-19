import { Request, Response, NextFunction } from "express";

export class IsAdmin {
  async handle(req: Request, res: Response, next: NextFunction) {
    if (req.body.userLogin.user_type === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized user." });
    }
  }
}

export default IsAdmin;
