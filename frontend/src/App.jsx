

import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import NavBar from "./Components/NavBar.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Admin from "./Pages/Admin.jsx";
import ProtectedRoute from "./Route/ProtectecRoute.jsx";
import {AuthContext} from "./Context/authContext.jsx";
import {useContext, useEffect} from "react";
import MyNotes from "./Pages/MyNotes.jsx";


function App() {
    const { currentUser } = useContext(AuthContext)
    // useEffect(()=>{
    //     console.log(currentUser)
    // },[currentUser])
  

  return (
    <div >
      <NavBar/>

      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/contact' element={<Contact/>}/>
         {/*<Route path='/mynotes' element={<MyNotes/>}/>*/}

          <Route
              path="/signup"
              element={
                  currentUser ? (
                      <Navigate to="/" /> // Redirect to home if logged in
                  ) : (
                      <Signup />
                  )
              }
          />

          {/* Login Route */}
          <Route
              path="/login"
              element={
                  currentUser ? (
                      <Navigate to="/" /> // Redirect to home if logged in
                  ) : (
                      <Login />
                  )
              }
          />

          <Route
              path="/myNotes"
              element={
                  currentUser ? (
                      <MyNotes />
                  ) : (
                      <Navigate to="/login" />
                  )
              }
          />

         <Route path='/admin' element={<ProtectedRoute> <Admin/> </ProtectedRoute>}/>
      </Routes>

  </div>
  
  )
}

export default App
