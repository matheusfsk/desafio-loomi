import { Response, Request } from "express";

export class UserDetailsController {
  async handle(req: Request, res: Response) {
    return res.status(200).json(req.body.userLogin);
  }
}

export default UserDetailsController;
