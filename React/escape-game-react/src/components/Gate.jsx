import React, { useState, useEffect } from 'react'


export default function Gate(props) {
    const [hotbar1, setHotbar1] = useState()
    const [hotbar2, setHotbar2] = useState()
    const [hotbar3, setHotbar3] = useState()
    const [hotbar4, setHotbar4] = useState()
    const [hotbar5, setHotbar5] = useState()
    const [hotbar6, setHotbar6] = useState()
    const [hotbar7, setHotbar7] = useState()
    const [commentary, setCommentary] = useState()
    const [newGame, setNewGame] = useState()
    const [playerLocation, setPlayerLocation] = useState()


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
            console.log('FindPlayerData: newGame:', newGame, 'location:', playerLocation)
            // console.log('GAME current Player Data for',attr,":",, 'saved as:', playerData)
        })
        // return playerData
    }

    useEffect(() => {findPlayerData()}, [])


    return (
        <>
        <div className="">
            <div id="gate" className='front-page row justify-content-center'>
                {props.updatePlayer({'current_location':"gate"})}
                <div className="column-test col-11">
                    <h1>GATE</h1>
                </div>

                <div className="column-test2 col">
                    <div className="hotbar row">{hotbar1}</div>
                    <div className="hotbar row">{hotbar2}</div>
                    <div className="hotbar row">{hotbar3}</div>
                    <div className="hotbar row">{hotbar4}</div>
                    <div className="hotbar row">{hotbar5}</div>
                    <div className="hotbar row">{hotbar6}</div>
                    <div className="hotbar row">{hotbar7}</div>
                </div>
                <div className="bottom-bar d-flex">
                    <div className="character-commentary col justify-content-end">
                        <h3 className="mt-3">{commentary}</h3>
                    </div>
                    <div className="hotbar-menu col-1">
                        HINT
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
