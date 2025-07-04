import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/authContext.jsx";

function Home() {
    const userData = localStorage.getItem('currentUser');
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser?._id)

    return (
        <div>
            <div>
                <button onClick={()=>navigate("/myNotes")}>My Notes</button>
            </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-red-600">C..........NNNNN</span> <span className="text-blue-600">Notes</span>.com
                </h1>
                <h2 className="text-lg text-gray-600">
                    Save your <span className="font-semibold text-purple-600">important notes</span> with us and access them anytime, anywhere.
                </h2>
                {userData && (
                    <div className="mt-6 text-green-600 font-medium">
                        Logged in as: {JSON.parse(userData).username}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default Home;



// import React from 'react';
//
// function Home() {
//     const userData = localStorage.getItem('currentUser');
//
//   return (
//     <div>
//         <div><h1>Welcome to  <span className='text-xl text-red-600 bold '>CN</span> notes.com</h1></div>
//         <div><h2>Save your important Notes with us</h2></div>
//     </div>
//   );
// }
//
// export default Home;