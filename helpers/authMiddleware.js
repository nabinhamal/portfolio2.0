import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//proteected routes token base


export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}



//admin access 
export const isAdmin = async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:"Unathorized access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            error,
            message:"Error in admin middleware"
        })
    }
}