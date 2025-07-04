import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../Context/authContext.jsx";
import {BASE_URL} from "../Config/Config.js";

function Signup() {
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    const [err,setErr] =useState("")
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));

    };

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(user)
        const registerUser = axios.post(`${BASE_URL}/api/users/register`,user,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // If server sets a cookie
            }
            )
            .then(res=>{
                console.log(res)
                login(res.data)
                setErr("");
            }).catch((err)=>{
                const errorMessage = err.response?.data?.message || "Registration failed.";
                console.error("Error Message:", errorMessage); // clear message
                console.error("Full Error:", err); // full axios error object
                setErr(errorMessage); // ✅ update the error state
            })

    }
  return (
    <form onSubmit={handleSubmit}>
        { err && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
                {err}
            </div>
        )}
      <div>
          <label>User Name</label>
          <input type='text' name='username' value={user.username}  placeholder='Enter User Name' onChange={handleChange}/>
      </div>
        <div>
            <label>Email</label>
            <input type='email' name='email'  value={user.email}  placeholder='Enter Email' onChange={handleChange}/>
        </div>
        <div>
            <label>Password</label>
            <input type='password' name='password' value={user.password}  placeholder='Enter Password' onChange={handleChange}/>
        </div>

        <button type="submit">SignUp</button>


    </form>
  );
}

export default Signup;