import express from "express"
import routes from "../routes"
import { 
    read_users, 
    read_user, 
    update_user, 
    delete_user,
    signup, 
    signin, 
    check_token
} from "../controllers/userController";

const userRouter = express.Router();
userRouter.post(routes.signup, signup);
userRouter.post(routes.signin, signin);
userRouter.post(routes.check_token, check_token);
userRouter.get(routes.home, read_users);
userRouter.get(routes.userDetail, read_user);
userRouter.put(routes.userDetail, update_user);
userRouter.delete(routes.userDetail, delete_user);

export default userRouter;