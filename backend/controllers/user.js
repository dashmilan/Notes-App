import bcrypt from "bcrypt";
import {User} from "../models/User.js";

export const update = async(req,res)=>{
    if (req.body.userId === req.params.id ){
        if(req.body.password){

            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)

                const user = await User.findByIdAndUpdate(req.params.id,{
                    $set: req.body
                })
                console.log(user)
                res.status(200).json({data:user,message:"Account has been update"})
            }catch (e) {
                return res.status(500).json(e)
            }
        }


    } else{
        return res.status(403).json("You can update only your account")
    }
}