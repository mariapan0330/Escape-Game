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
import Garden from './components/Garden';
import Fountain from './components/Fountain';
import Plaza from './components/Plaza';
import FlowerTunnel from './components/FlowerTunnel';
import Gazebo from './components/Gazebo';
import Porch from './components/Porch';
// This one has all the routes which you make in your components folder.
// The user is called "Player" not user (but they do have a "username" not "playername").

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)
    const [editUser, setEditUser] = useState(false)

    // const [atGate, setAtGate] = useState(false)
    // const [atPrologue, setAtPrologue] = useState(true)
    // const [atGarden, setAtGarden] = useState(false)
    // const [atFountain, setAtFountain] = useState(false)
    // const [atPlaza, setAtPlaza] = useState(false)
    // const [atFlowerTunnel, setAtFlowerTunnel] = useState(false)
    // const [atGazebo, setAtGazebo] = useState(false)
    // const [atPorch, setAtPorch] = useState(false)
    const [atLocation, setAtLocation] = useState('prologue')
    
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
    const [color, setColor] = useState('light')

    // const [selectedKeyA, setSelectedKeyA] = useState(false)
    const [selectedItem, setSelectedItem] = useState('default-none')
    const [solvedGateKeyhole, setSolvedGateKeyhole] = useState(false)

    // const [selectedCoin, setSelectedCoin] = useState(false)
    const [solvedAddressScrews, setSolvedAddressScrews] = useState(false)
    const [solvedMailboxBox, setSolvedMailboxBox] = useState(false)

    const [commentary, setCommentary] = useState(<>&nbsp;</>)

    const [hotbarAndCommentary, setHotbarAndCommentary] = useState()
    const [currentPlayerUsername, setCurrentPlayerUsername] = useState()
    const [currentPlayerId, setCurrentPlayerId] = useState()
    

    const login = () => {
        const loginPromise = new Promise(() =>
            setLoggedIn(true)
        );
        loginPromise.then(() => findCurrentPlayer())
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
    

    // pick up an item by the item's id
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
                } else if (slot === 3){
                    updatePlayer({"hotbar_slot_3":`${item}`})
                }
                break
            }
        }
        setRerenderHotbar(rerenderHotbar++)
        setHotbar(renderHotbar())
    }


    // drop an item by the item name
    const dropItem = (itemName) => {
        console.log('== TRYING TO DROP ITEM', itemName, "==")
        for (let slot in hotbarSlots){
            console.log(hotbarSlots[slot])
            if (hotbarSlots[slot] === itemName){
                slot++
                if (slot === 1){
                    updatePlayer({"hotbar_slot_1":1})
                } else if (slot === 2){
                    updatePlayer({"hotbar_slot_2":1})
                } else if (slot === 3){
                    updatePlayer({"hotbar_slot_3":1})
                }
                console.log('Dropped itemName:', itemName, 'from slot', slot)
                setSelectedItem('default-none')
                break
            }
        }
        setHotbar(renderHotbar())
    }


    const renderHotbar = () => {
        return (
            <>
            {hotbarSlots.filter((slot) => slot !== 'default-none').map((slot) => 
                <div className={`hotbar hotbar-item row text-${color} fs-5`} onClick={() => {
                    // TODO: for the love of all things pls make this more efficient
                    // if you clicked the one that is key-a
                        // if it was previously selected, de-select it
                        // if it was previously NOT selected, select it (and deselect everything else)


                    if (selectedItem !== 'default-none'){
                        // if you had something that's not default-none selected and you click it again, deselect it.
                        setCommentary(<>&nbsp;</>)
                        setColor('light')
                        updatePlayer({'selected_item':1})
                        setSelectedItem('default-none')
                    } else if (slot === 'key-a' && selectedItem === 'default-none') {
                        // if you did not have key a selected and you click it, select it.
                        setCommentary("A heavy wrought-iron key. I wonder what it's for.")
                        setColor('warning fw-bold')
                        setSelectedItem('key-a')
                        updatePlayer({'selected_item':3})
                    } else if (slot === 'coin'){
                        // if it was not selected, select it
                        setCommentary('A big shiny iron coin. Pretty sturdy but not worth much.')
                        setColor('warning fw-bold')
                        setSelectedItem('coin')
                        updatePlayer({'selected_item':9})
                        // deselect magnet, key-b, knife, blue gem, key-c, and telescope lens
                    } else if (slot === 'red-gem'){
                        setCommentary('A shiny red gem')
                        setColor('warning fw-bold')
                        setSelectedItem('red-gem')
                        updatePlayer({'selected_item':12})
                        
                    }
                }}>{slot}</div>)}
            {hotbarSlots.filter((slot) => slot === 'default-none').map((slot) => 
                <div className="hotbar row text-dark" onClick={() => {
                    updatePlayer({'selected_item':1})
                    setCommentary('EMPTY')
                }}></div>)}
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
                        <h4 className="mt-3 fs-3">{commentary}</h4>
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
            setSolvedGateKeyhole(data['solved_gate_keyhole'])
            setSolvedAddressScrews(data['solved_address_screws'])
            setSelectedItem(data['selected_item'])
            // setSolvedAddressScrews, setSolvedMailboxBox
            console.log('current Player Data:',currentPlayerUsername, currentPlayerId)
            return data['current_location']
        })
        // console.log('current Player Data2:',currentPlayerUsername)
    }
    

    const deletePlayer = () => {
        console.log('=== DELETING PLAYER', currentPlayerId, '===')
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        fetch(`http://127.0.0.1:5000/auth/players/${currentPlayerId}`, {
            method: 'DELETE',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                if (data.success){
                    console.log('Successfully deleted')
                }
            })
        logout()
    }


    const updatePlayer = (what) => {
        // findCurrentPlayer()
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
                {
                // Am i logged in?
                loggedIn ? 
                    // if logged in, am i at prologue?
                        atLocation === 'prologue' ?
                            <Game 
                                currentPlayerUsername={currentPlayerUsername} 
                                updatePlayer={updatePlayer} 
                                setAtLocation={setAtLocation}
                                /> 
                            : 
                        // if not at prologue, am i at the gate?
                        atLocation === 'gate' ? <Gate
                                    setAtLocation={setAtLocation}

                                    hotbarAndCommentary={hotbarAndCommentary}
                                    renderHotbarAndCommentary={renderHotbarAndCommentary}

                                    updatePlayer={updatePlayer}
                                    hotbarSlots={hotbarSlots}
                                    setCommentary={setCommentary}
                                    rerenderHotbar={rerenderHotbar}
                                    setRerenderHotbar={setRerenderHotbar}
                                    
                                    pickupItem={pickupItem}
                                    dropItem={dropItem}

                                    selectedItem={selectedItem}

                                    solvedAddressScrews={solvedAddressScrews}
                                    setSolvedAddressScrews={setSolvedAddressScrews}

                                    solvedGateKeyhole={solvedGateKeyhole}
                                    setSolvedGateKeyhole={setSolvedGateKeyhole}
                                    />
                                    : 
                        // if not at the gate, am I at the garden?
                        atLocation === 'garden' ? <Garden
                            setAtLocation={setAtLocation}

                            updatePlayer={updatePlayer}
                            hotbarSlots={hotbarSlots}
                            setCommentary={setCommentary}
                            rerenderHotbar={rerenderHotbar}
                            renderHotbarAndCommentary={renderHotbarAndCommentary}
                            />
                            :
                        // if not at the garden, am I at the fountain?
                        atLocation === 'fountain' ? <Fountain
                            setAtLocation={setAtLocation}

                            updatePlayer={updatePlayer}
                            renderHotbarAndCommentary={renderHotbarAndCommentary}
                            pickupItem={pickupItem}
                            setCommentary={setCommentary}
                            selectedItem={selectedItem}
                             />
                        :
                        // if not at the fountain, am I at the plaza?
                        atLocation === 'plaza' ? <Plaza
                            updatePlayer={updatePlayer}
                            setAtLocation={setAtLocation}
                            renderHotbarAndCommentary={renderHotbarAndCommentary}
                            setCommentary={setCommentary}
                             />
                        :
                        // if not at the plaza, am I at the flower tunnel?
                        atLocation === 'flower-tunnel' ? <FlowerTunnel
                            updatePlayer={updatePlayer}
                            setAtLocation={setAtLocation}
                            renderHotbarAndCommentary={renderHotbarAndCommentary}
                            setCommentary={setCommentary}
                             />
                        :
                        // if not at the flower Tunnel, am I at the gazebo?
                        atLocation === 'gazebo' ? <Gazebo
                            updatePlayer={updatePlayer}
                            setAtLocation={setAtLocation}
                            renderHotbarAndCommentary={renderHotbarAndCommentary}
                            setCommentary={setCommentary}
                             />
                        :
                        // if not at the gazebo, am I at the porch?
                        atLocation === 'porch' ? <Porch
                            updatePlayer={updatePlayer}
                            setAtLocation={setAtLocation}
                            renderHotbarAndCommentary={renderHotbarAndCommentary}
                            setCommentary={setCommentary}
                             />
                        :
                        // if not at any of these:
                        <>
                        {/* PURGATORY */}
                        {setAtLocation('prologue')}
                        </>

                    // if not logged in, show the landing page and sign up/sign in
                    :
                    <>
                        <Landing
                            loggedIn={loggedIn} logout={logout}
                            linkToSignUpLogin={<HashLink to="#signup-or-login"><p><i className="fa-regular fa-circle-play"></i></p></HashLink>}
                            linkToFooter={<HashLink to="#footer"><h1>New Game</h1></HashLink>} />
                        <SignupOrLogin 
                            login={login} 
                            loggedIn={loggedIn} 
                            findCurrentPlayer={findCurrentPlayer}
                            linkToLanding={<HashLink to='#landing'><p><i className="fa-solid fa-arrow-up"/>Back to top</p></HashLink>}
                            />
                    </>
                }

                {editUser ? <EditUser setEditUser={setEditUser} deletePlayer={deletePlayer} /> : <></> }
            </div>
            <Footer
                setAtLocation={setAtLocation}
                currentPlayerUsername={currentPlayerUsername}
                loggedIn={loggedIn} 
                // setAtPrologue={setAtPrologue} 
                // setAtGate={setAtGate} 
                logout={logout} 
                setEditUser={setEditUser} />
        </>
    );
}

export default App;
