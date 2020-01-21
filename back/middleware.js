import routes from "./routes"
import jwt from "jsonwebtoken"
import {users} from "./models"

export const localsMiddelWare = async (req, res, next) => {
    const accessToken = await req.get('accessToken');
    if (typeof accessToken != 'undefined') {
        const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY)
        if (decoded) {        
            const user = await users.findOne({where:{id:decoded.user_id}});   
            res.locals.user = user.dataValues;
            console.log(user.dataValues);
            
        } else {
            next();
        }
    }
    res.locals.siteName = "SaMoIm";
    next();
};

export const onlyPublic = (req, res, next) => {
    if (res.locals.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if (res.locals.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}