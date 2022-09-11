import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link';
import Game from './components/Game';
import Modal from './components/Modal';
import SignupOrLogin from './components/SignupOrLogin';
import Index from './components/Landing';
// This one has all the routes which you make in your components folder.
// The user is called "Player" not user (but they do have a "username" not "playername").

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)
    
    const login = () => {setLoggedIn(true)}
    const logout = () => {
        console.log(localStorage.getItem('token'), loggedIn)
        localStorage.removeItem('token')
        setLoggedIn(false)
        console.log('logging out....', localStorage.getItem('token'), loggedIn)
    }


    return (
        <>
            <div className="container-fluid">
                <Index loggedIn={loggedIn} logout={logout}
                    linkToSignUpLogin={<HashLink to="#signup-or-login"><p><i className="fa-regular fa-circle-play"></i></p></HashLink>} />
                    {/* The hashlinks let you move within one page */}
                <SignupOrLogin login={login} loggedIn={loggedIn} />
                <Routes> {/* The Routes actually change tabs */}
                    <Route path='/' element={<Game loggedIn={loggedIn} logout={logout} />} />
                </Routes>
                {/* <Route path='/signup' element={<Signup login={login} />} />
                <Route path='/login' element={<Login login={login} />} />
                <Route path='/game' element={<Game loggedIn={loggedIn} />} /> */}
            </div>
        </>
    );
}

export default App;
