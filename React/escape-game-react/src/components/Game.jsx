import React, { useState, useEffect } from 'react'

export default function Game(props) {
    // props.linkToSignUp
    // props.linkToFooter
    const [playerData, setPlayerData] = useState()
    const [showLanding, setShowLanding] = useState(true)
    const [showPrologue, setShowPrologue] = useState(false)
    const [prologue, setPrologue] = useState()

    const findPlayerData = (attr) => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                setPlayerData(data[attr])
                console.log('current Player Data:',playerData)
            })
        return playerData
    }

    const beginPrologue = () => {
        return (
            <>
                <h3>Prologue Page 1</h3>
                {/* <h5 onClick={() => setPrologue(prologuePage2)}>Next Page</h5> */}
            </>
            
        )
    }
    
    // const prologuePage2 = () => {
    //     return (
    //         <>
    //             <h3>Prologue Page 2</h3>
    //             <h5 onClick={() => setPrologue(prologuePage3)}>Next Page</h5>
    //         </>
            
    //     )
    // }

    // const prologuePage3 = () => {
    //     return (
    //         <>
    //             <h3>Prologue Page 2</h3>
    //             <h5>Start Tutorial</h5>
    //             {/* <h5 onClick={() => setPrologue(prologuePage4)}>Next Page</h5> */}
    //         </>
            
    //     )
    // }

    useEffect(() => {setPrologue(beginPrologue())},[])

    const handleNewGame = () => {
        console.log('===== NEW GAME =====')
        setShowLanding(false)
        setShowPrologue(true)
    }

    const handleContinueGame = () => {

    }

    const landing = () => {
        return (
            <>
                <div className="col text-center">
                    <h1>Lockwood</h1>
                    <h2>Mystery</h2>
                    {findPlayerData("new_game") === true ? 
                    <button className='btn btn-light fs-1 mt-4' onClick={() => {handleNewGame()}}>New Game</button>
                    :
                    <button className='btn btn-light fs-4 mt-3' onClick={() => {handleContinueGame()}}>Continue Game</button>
                    }
                    <br />
                </div>
                <div className="col"></div>
            </>
        )
    }


    return (
        <>
        <div className="d-flex justify-content-center">
            <div id="game" className='front-page row'>
                {showLanding ? landing() : <></> }
                {showPrologue ? beginPrologue() : <></>}


            </div>
        </div>
        </>
    )
}
