import './App.css';
import { useState, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link';
import Footer from './components/Footer';
import SignupOrLogin from './components/SignupOrLogin';
import Landing from './components/Landing';
import EditUser from './components/EditUser';
import Game from './components/Game';
// import basicKey from './key';
import Gate from './components/Gate';
// This one has all the routes which you make in your components folder.
// The user is called "Player" not user (but they do have a "username" not "playername").

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)
    const [editUser, setEditUser] = useState(false)
    const [atGate, setAtGate] = useState(false)
    const [atPrologue, setAtPrologue] = useState(true)
    
    const [hotbar1, setHotbar1] = useState()
    const [hotbar2, setHotbar2] = useState()
    const [hotbar3, setHotbar3] = useState()
    const [hotbar4, setHotbar4] = useState()
    const [hotbar5, setHotbar5] = useState()
    const [hotbar6, setHotbar6] = useState()
    const [hotbar7, setHotbar7] = useState()
    const hotbarSlots = [hotbar1, hotbar2, hotbar3, hotbar4, hotbar5, hotbar6, hotbar7]
    const [hotbar, setHotbar] = useState()
    const [rerenderHotbar, setRerenderHotbar] = useState(0)

    const [commentary, setCommentary] = useState(<>&nbsp;</>)

    const [hotbarAndCommentary, setHotbarAndCommentary] = useState()
    const [currentPlayerUsername, setCurrentPlayerUsername] = useState()
    const [currentPlayerId, setCurrentPlayerId] = useState()
    
    const login = () => {
        setLoggedIn(true)
    }

    useEffect(() => {
        const render = new Promise((resolve, reject) => {
            setHotbar(renderHotbar())
            resolve('rendered hotbar')
        })
        render.then(setHotbarAndCommentary(renderHotbarAndCommentary()))
    }, [hotbar1, hotbar2, hotbar3, hotbar4, hotbar5, hotbar6, hotbar7, rerenderHotbar])


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

    const pickupItem = (item) => {
        console.log('== TRYING TO PICK UP ITEM', item, '==')
        for (let slot in hotbarSlots){
            if (hotbarSlots[slot] !== 'default-none'){
                console.log('checking hotbar slot', slot, ":", hotbarSlots[slot])
                continue
            } else {
                console.log('we found an empty slot:', slot)
                // let slotString = `hotbar_slot_${Number(slot)+1}`
                
                slot++
                if (slot === 1){
                    updatePlayer({"hotbar_slot_1":`${item}`})
                } else if (slot === 2){
                    updatePlayer({"hotbar_slot_2":`${item}`})
                }
                break
            }
        }
        setHotbar(renderHotbar())
    }


    const renderHotbar = () => {
        return (
            <>
            {hotbarSlots.filter((slot) => slot !== 'default-none').map((slot) => <div className="hotbar row text-warning">{slot}</div>)}
            {hotbarSlots.filter((slot) => slot === 'default-none').map((slot) => <div className="hotbar row">{slot}</div>)}
            </>
        )
    }

    const renderHotbarAndCommentary = () => {
        return (
            <>
                {/* HOTBAR */}
                <div className="hotbar col">
                {hotbar}
                </div>
                
                <div className="bottom-bar d-flex align-items-center">
                    <div className="character-commentary col justify-content-end">
                        <h3 className="mt-3">{commentary}</h3>
                    </div>
                    <div className="hint-box col-1" onClick={() => {setCommentary('I don\'t know either, man.')}}>
                        {/* {playerLocation} */}
                        HINT
                    </div>
                </div>
            </>
        )
    }

    
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
            setHotbar1(data['hotbar_slot_1']['piece_name'])
            setHotbar2(data['hotbar_slot_2']['piece_name'])
            setHotbar3(data['hotbar_slot_3']['piece_name'])
            setHotbar4(data['hotbar_slot_4']['piece_name'])
            setHotbar5(data['hotbar_slot_5']['piece_name'])
            setHotbar6(data['hotbar_slot_6']['piece_name'])
            setHotbar7(data['hotbar_slot_7']['piece_name'])
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
                    setRerenderHotbar(rerenderHotbar+1)
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
                {atGate ? <Gate hotbarAndCommentary={hotbarAndCommentary}
                                renderHotbarAndCommentary={renderHotbarAndCommentary}
                                updatePlayer={updatePlayer}
                                hotbarSlots={hotbarSlots}
                                setCommentary={setCommentary}
                                rerenderHotbar={rerenderHotbar}
                                setRerenderHotbar={setRerenderHotbar}
                                pickupItem={pickupItem} /> : <></>}

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
