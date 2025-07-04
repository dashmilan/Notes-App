import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, [currentUser]); // Empty dependency array means it runs only once

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser'); // Ensure it's removed if currentUser becomes null
        }
    }, [currentUser]); // Runs whenever currentUser changes

    const login = (userData) => {
        setCurrentUser(userData);
        //localStorage.setItem('currentUser', JSON.stringify(userData)); // ✅ localStorage එකට save
    };

    const logout = () => {
        setCurrentUser(null);
         localStorage.removeItem('currentUser'); // ✅ logout එකේදී remove කරන්න
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
