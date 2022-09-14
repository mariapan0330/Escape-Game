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
import Gate from './components/Gate';
// This one has all the routes which you make in your components folder.
// The user is called "Player" not user (but they do have a "username" not "playername").

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)
    const [editUser, setEditUser] = useState(false)
    const [atGate, setAtGate] = useState(false)
    const [atPrologue, setAtPrologue] = useState(true)
    const [houseNum, setHouseNum] = useState()
    const [currentPlayerUsername, setCurrentPlayerUsername] = useState()
    const [currentPlayerId, setCurrentPlayerId] = useState()
    
    const login = () => {
        setLoggedIn(true)
    }

    useEffect(() => {
        if (loggedIn === true){
            findCurrentPlayer()
        }
    }, [loggedIn])
    
    
    // TODO: will this also render on mount?
    // useEffect(() => {
        // console.log('finding current user')
    //     findCurrentPlayer()
    // }, [])

    
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
            setCurrentPlayerId(data["id"])
            console.log('current Player Data:',currentPlayerUsername, currentPlayerId)
        })
        // console.log('current Player Data2:',currentPlayerUsername)
    }
    


    const updatePlayer = (what) => {
        findCurrentPlayer()
        let myHeaders = new Headers()
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`)
        myHeaders.append('Content-Type',"application/json")

        var toUpdate = JSON.stringify(what)

        fetch(`http://127.0.0.1:5000/auth/players/${currentPlayerId}`, {
            method: "PUT",
            headers: myHeaders,
            body: toUpdate
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error){
                    console.log('Player', currentPlayerId, 'has been updated with:', what)
                }
            })
    }

    return (
        <>
            <div className="container-fluid">
                {/* The hashlinks let you move within one page */}
                {loggedIn ? 
                    atPrologue ?
                        <Game 
                            currentPlayerUsername={currentPlayerUsername} 
                            setAtGate={setAtGate} 
                            setAtPrologue={setAtPrologue}
                            updatePlayer={updatePlayer} /> : <></>
                    :
                    <>
                        <Landing loggedIn={loggedIn} logout={logout}
                            linkToSignUpLogin={<HashLink to="#signup-or-login"><p><i className="fa-regular fa-circle-play"></i></p></HashLink>}
                            linkToFooter={<HashLink to="#footer"><h1>New Game</h1></HashLink>} />
                        <SignupOrLogin login={login} loggedIn={loggedIn} findCurrentPlayer={findCurrentPlayer} />
                    </>}
                {atGate ? <Gate updatePlayer={updatePlayer} /> : <></>}

                {editUser ? <EditUser setEditUser={setEditUser} /> : <></> }
            </div>
            <Footer currentPlayerUsername={currentPlayerUsername}
                loggedIn={loggedIn} 
                setAtPrologue={setAtPrologue} 
                setAtGate={setAtGate} 
                logout={logout} 
                setEditUser={setEditUser} />
        </>
    );
}

export default App;
