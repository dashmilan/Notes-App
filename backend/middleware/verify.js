import jwt from 'jsonwebtoken';

const jwtSecret = 'sdfljewrnndfnjnsdf';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];


    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // save decoded user info
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
