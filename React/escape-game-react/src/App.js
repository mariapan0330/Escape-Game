import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link';
import Footer from './components/Footer';
import Modal from './components/Modal';
import SignupOrLogin from './components/SignupOrLogin';
import Landing from './components/Landing';
import EditUser from './components/EditUser';
import Game from './components/Game';
import basicKey from './key';
// This one has all the routes which you make in your components folder.
// The user is called "Player" not user (but they do have a "username" not "playername").

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)
    const [editUser, setEditUser] = useState(false)
    const [currentPlayerUsername, setCurrentPlayerUsername] = useState()
    
    const login = () => {
        setLoggedIn(true)
    }

    useEffect(() => {
        findCurrentPlayer()
    }, [loggedIn])

    
    useEffect(() => {
        console.log('finding current user')
        findCurrentPlayer()
    }, [])


    const logout = () => {
        console.log(localStorage.getItem('token'), loggedIn)
        localStorage.removeItem('token')
        setLoggedIn(false)
        console.log('logging out....', localStorage.getItem('token'), loggedIn)
    }

    const findCurrentPlayer = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setCurrentPlayerUsername(data["username"])
                console.log('current Player Data:',currentPlayerUsername)
            })
            // console.log('current Player Data2:',currentPlayerUsername)
    }


    return (
        <>
            <div className="container-fluid">
                {/* The hashlinks let you move within one page */}
                {loggedIn ? 
                    <>
                    <Game currentPlayerUsername={currentPlayerUsername} />
                    </>
                    : <>
                        <Landing loggedIn={loggedIn} logout={logout}
                            linkToSignUpLogin={<HashLink to="#signup-or-login"><p><i className="fa-regular fa-circle-play"></i></p></HashLink>}
                            linkToFooter={<HashLink to="#footer"><h1>New Game</h1></HashLink>} />
                        <SignupOrLogin login={login} loggedIn={loggedIn} findCurrentPlayer={findCurrentPlayer} />
                    </>}

                {editUser ? <EditUser setEditUser={setEditUser} /> : <></> }
                {/* <Routes> The Routes actually change tabs
                    <Route path='/' element={<Game loggedIn={loggedIn} logout={logout} />} />
                </Routes> */}
                {/* <Route path='/signup' element={<Signup login={login} />} />
                <Route path='/login' element={<Login login={login} />} />
                <Route path='/game' element={<Game loggedIn={loggedIn} />} /> */}
            </div>
            <Footer currentPlayerUsername={currentPlayerUsername} loggedIn={loggedIn} logout={logout} setEditUser={setEditUser} />
        </>
    );
}

export default App;
