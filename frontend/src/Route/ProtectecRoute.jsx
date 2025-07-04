import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext.jsx"; // ඔබේ AuthContext path එකට match කරන්න

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser?.isAdmin) {

        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
