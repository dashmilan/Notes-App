import React, {useContext} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/authContext.jsx";

function NavBar() {



    const { currentUser ,logout } = useContext(AuthContext)
    const navigate = useNavigate();


    return (
        <div className='w-full bg-green-300 flex justify-between'>

            <div>

                <Link to='/' className='p-4'>Home</Link>
                <Link to='/about' className='p-4'>About</Link>
                <Link to='/contact' className='p-4'>Contact</Link>
                {
                    currentUser?.isAdmin && <button onClick={()=>{navigate("/admin")}}>Admin page</button>
                }
                {
                    !currentUser && <div>
                        <Link to='/signup' className='p-4'>Signup</Link>
                        <Link to='/login' className='p-4'>Login</Link>
                    </div>

                }
            </div>
            <div>
                {currentUser ? (
                    <p>Welcome, {currentUser.username}!</p>
                ) : (
                    <p>Please log in</p>
                )}

            </div>
            <div>
                {currentUser && <button onClick={()=>logout()}>Logout</button>}
            </div>


        </div>
    );
}

export default NavBar;