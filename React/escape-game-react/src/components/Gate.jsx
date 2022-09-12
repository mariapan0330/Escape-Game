import React, { useState, useEffect } from 'react'


export default function Gate(props) {
    const [hotbar1, setHotbar1] = useState()
    const [hotbar2, setHotbar2] = useState()
    const [hotbar3, setHotbar3] = useState()
    const [hotbar4, setHotbar4] = useState()
    const [hotbar5, setHotbar5] = useState()
    const [hotbar6, setHotbar6] = useState()
    const [hotbar7, setHotbar7] = useState()
    const [commentary, setCommentary] = useState(<>&nbsp;</>)
    const [newGame, setNewGame] = useState()
    const [playerLocation, setPlayerLocation] = useState()
    const hotbars = [hotbar1, hotbar2, hotbar3, hotbar4, hotbar5, hotbar6, hotbar7]

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
            setHotbar1(data['hotbar_slot_1']['piece_name'])
            setHotbar2(data['hotbar_slot_2']['piece_name'])
            setHotbar3(data['hotbar_slot_3']['piece_name'])
            setHotbar4(data['hotbar_slot_4']['piece_name'])
            setHotbar5(data['hotbar_slot_5']['piece_name'])
            setHotbar6(data['hotbar_slot_6']['piece_name'])
            setHotbar7(data['hotbar_slot_7']['piece_name'])
            setPlayerLocation(data['current_location'])
            console.log('FindPlayerData: newGame:', newGame, 'location:', playerLocation)
            console.log('FindPlayerData: hotbar1:', hotbar1)
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
                    <div className="hotbar-menu col-1" onClick={() => {setCommentary('I don\'t know either, man.')}}>
                        HINT
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
