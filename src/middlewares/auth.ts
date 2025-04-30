import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user-model';

async function isAuth(req: Request, res: Response, next: NextFunction) {

    let userToken = req.header("token") as string


    if (userToken === undefined) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    let userLogged = await UserModel.checkToken(userToken)

    res.locals.user = userLogged

    if (userLogged === undefined){
        return res.status(401).json({ message: "Unauthorized" })
    }
    

    next()
   
}

export default isAuth