import {User} from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const jwtSecret = 'sdfljewrnndfnjnsdf'   

export const auth = (req, res) => {
    res.send('hey its user route')
}

export const registerUser = async (req, res) => {

        const {username, email, password} = req.body

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered.' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        newUser.password = undefined;
        const token = jwt.sign(
            {newUser}, jwtSecret, {
                expiresIn: '2h'
            }
        )
        res.cookie('token', token)
        res.status(200).send(newUser)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Server error during registration.' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)

    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json('Wrong password');
        }

        user.password = undefined; // optional: removes password before sending
        const token = jwt.sign({ id: user._id,role:user.isAdmin}, jwtSecret, { expiresIn: '2h' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            //secure: true
        });
        res.status(200).send(user);

    } catch (e) {
        console.log(e);
        res.status(500).json('Server error');
    }
}
