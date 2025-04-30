import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user-model';

async function isAdmin(req: Request, res: Response, next: NextFunction) {

    let userId = res.locals.user.id
    console.log("🚀 ~ isAdmin ~ userId:", userId)

    let userLogged = await UserModel.findUser(userId)

    if (userLogged?.isAdmin === false) {

        return res.status(401).json({ message: "Unauthorized" })

    }


    next()

}

export default isAdmin