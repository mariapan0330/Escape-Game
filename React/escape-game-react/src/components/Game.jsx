import React, { useState, useEffect } from 'react'

export default function Game(props) {
    // props.linkToSignUp
    // props.linkToFooter
    const [showLanding, setShowLanding] = useState(true)
    const [showPrologue, setShowPrologue] = useState(false)
    const [prologue, setPrologue] = useState()
    const [commentary, setCommentary] = useState(<>&nbsp;</>)
    const [newGame, setNewGame] = useState()
    const [playerLocation, setPlayerLocation] = useState()

    useEffect(() => {
        findPlayerData()
    }, [])

    const findPlayerData = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
        .then(res => res.json())
        .then(data => {
            setNewGame(data["new_game"])
            setPlayerLocation(data['current_location'])
            // console.log('FindPlayerData: newGame:', newGame, 'location:', playerLocation)
            // console.log('GAME current Player Data for',attr,":",, 'saved as:', playerData)
        })
        // return playerData
    }

    
    const beginPrologue = (page) => {
        if (page === 1){
            props.updatePlayer({"current_location":"prologue1"})
            props.updatePlayer({"new_game":false})
            console.log('current_location: prologue1')
            setCommentary(<>&nbsp;</>)
            return (
                <>
                <div className="d-flex row">
                    <div id="prologue">
                        <h3 className="fs-3">Sept 6, 1985</h3>
                        <br />
                        <h3 className="fs-2">It's all over the news.<br/>
                        Lady Macaroni, a philanthropist and movie star and Lockwood's richest citizen...<br/>
                        has been murdered!</h3>
                        <br />
                        <button><h5 className="fs-3" onClick={() => setPrologue(beginPrologue(2))}>Next Page</h5></button>
                    </div>
                </div>
                </>
            )
        } else if (page === 2){
            props.updatePlayer({"current_location":"prologue2"})
            console.log('current_location: prologue2')
            setCommentary(<>&nbsp;</>)
            return (
                <>
                    <div id="prologue">
                        <h3 className="fs-3">Sept 6, 1985</h3>
                        <br />
                        <h3 className="fs-2">The authorities found Farmer Fettuccine guilty. <br />
                        They sentenced him to 30 years in prison.</h3>
                        <br />
                        <button><h5 className="fs-2" onClick={() => setPrologue(beginPrologue(3))}>Next Page</h5></button>
                    </div>
                </>
            )
        } else if (page === 3){
            props.updatePlayer({"current_location":"prologue3"})
            console.log('current_location: prologue3')
            setCommentary('I recognize the place in this picture. It\'s Lady Macaroni\'s mansion.')
            return (
                <>
                    <div id="prologue">
                        <h3 className="fs-3">Sept 7, 1985</h3>
                        <br />
                        <h3 className="fs-2">The day after the trial, you recieve a letter with $5000 and a note:</h3>
                        <h3 className="dig-deeper fs-1 ms-5">The murderer is not who they think it is.</h3>
                        <br/>
                        <h3 className="dig-deeper fs-1 ms-5">DIG DEEPER.</h3>
                        <h3 className="fs-3 ms-5">(Picture of Lady Macaroni's mansion)</h3>
                        <br />
                        <button><h5 className="fs-3" onClick={() => {
                            props.setAtGate(true)
                            props.setAtPrologue(false)
                            props.updatePlayer({'current_location':'gate'})
                        }}>BEGIN</h5></button>
                    </div>
                </>
            )
        }
    }

    // useEffect(() => {setPrologue(beginPrologue(1))},[])

    const handleNewGame = () => {
        console.log('===== NEW GAME =====')
        setShowLanding(false)
        setPrologue(beginPrologue(1))
        setShowPrologue(true)
    }

    const handleContinueGame = () => {
        console.log('===== CONTINUE GAME =====')
        // let playerLoc = playerLocation
        console.log('CONT current location:', playerLocation)
        if (playerLocation === 'prologue1'){
            setShowLanding(false)
            setPrologue(beginPrologue(1))
            setShowPrologue(true)
        } else if (playerLocation === 'prologue2'){
            setShowLanding(false)
            setPrologue(beginPrologue(2))
            setShowPrologue(true)
        } else if (playerLocation === 'prologue3'){
            setShowLanding(false)
            setPrologue(beginPrologue(3))
            setShowPrologue(true)
        } else if(playerLocation === 'gate' || playerLocation === 'inspect-address'){
            // props.updatePlayer({'hotbar_slot_1':2})
            props.setAtGate(true)
            props.setAtPrologue(false)
        }
    }

    const landing = () => {
        // props.updatePlayer({"location":"prologue"})
        // props.updatePlayer({"new_game":true})
        return (
            <>
                <div className="front-page-title col text-center">
                    <h1>Lockwood</h1>
                    <h2>Mystery</h2>
                    {newGame === true ? 
                    <button className='btn btn-light fs-1 mt-4' onClick={() => {handleNewGame()}}>New Game</button>
                    :
                    <button className='btn btn-light fs-4 mt-3' onClick={() => {handleContinueGame()}}>Continue Game</button>
                    }
                    <br />
                </div>
            </>
        )
    }


    return (
        <>
        <div className="">
            <div id="game" className='front-page row justify-content-center'>
                <div className="column-test col">
                    {showLanding ? landing() : <></> }
                    {showPrologue ? prologue : <></>}
                </div>
            </div>
        </div>
        </>
    )
}
