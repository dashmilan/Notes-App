
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../Context/authContext.jsx";
import {BASE_URL} from "../Config/Config.js";

function Login() {
    const [user,setUser] = useState({

        email:"",
        password:""
    })
    const { login ,currentUser } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));

    };
        const handleSubmit = (e)=>{
            e.preventDefault()
            const loginUser = axios.post(`${BASE_URL}/api/users/login`,user,{ withCredentials: true })
                .then(res=>{
                    console.log(res.data)
                    login(res.data)
                }).catch((err)=>{
                    console.log(err.response?.data?.message)
                    //const errorMessage = err.response?.data?.message
                })
    }
    // useEffect(() => {
    //     console.log(currentUser)
    // }, [currentUser]);
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>Email</label>
                <input type='email' name='email'  placeholder='Enter Email' onChange={handleChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type='password' name='password' placeholder='Enter Password' onChange={handleChange}/>
            </div>
            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;