import React, { useState, useEffect } from 'react'

export default function Plaza(props) {
    const [inspectMosaic, setInspectMosaic] = useState(false)
    const [inspectWallFountains, setInspectWallFountains] = useState(false)
    const [inspectBush, setInspectBush] = useState(false)

    const [solvedWallFountains, setSolvedWallFountains] = useState(false) // (this will never be true)

    const [wallSlot1, setWallSlot1] = useState('N')
    const [wallSlot2, setWallSlot2] = useState('N')
    const [wallSlot3, setWallSlot3] = useState('N')
    const [wallSlot4, setWallSlot4] = useState('N')

    const fullCombo = () => {
        let combo = wallSlot1 + wallSlot2 + wallSlot3 + wallSlot4
        console.log(combo)
        return combo
    }

    const findPlayerData = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
        .then(res => res.json())
        .then(data => {
            let comboEntered = String(data['wall_fountains_combination_entered'])
            setWallSlot1(comboEntered.slice(0,1))
            setWallSlot2(comboEntered.slice(1,2))
            setWallSlot3(comboEntered.slice(2,3))
            setWallSlot4(comboEntered.slice(3,4))
            setSolvedWallFountains(data['solved_wall_fountains'])
        })
        // return playerData
    }

    const translateWallCode = (lett) => {
        let translateKey = {
            'N': 'square',
            'R': 'gem text-danger',
            'B': 'gem text-primary',
            'G': 'gem text-success',
            'Y': 'gem text-warning',
        }
        return translateKey[lett]
    }

    useEffect(() => {
        findPlayerData()
    }, [])


    const handleWallSlots = (slot, setSlot) => {
        if (slot === 'N' && props.selectedItem === 'red-gem'){
            // if you are holding a gem, put that gem in the slot.
            setSlot('R')
            props.dropItem('red-gem')
            // props.updatePlayer({'has_red_gem': false})
            props.updatePlayer({'wall_fountains_combination_entered': fullCombo()})
            // props.setRerenderHotbar(props.rerenderHotbar+1)
            props.selectedItem('default-none')
        } else if (slot === 'N' && props.selectedItem === 'blue-gem'){
            setSlot('B')
            props.dropItem('blue-gem')
            props.updatePlayer({'wall_fountains_combination_entered': fullCombo()})
        } else if (slot === 'R'){
            // if the slot is not empty, pick up the gem in the slot
            props.pickupItem(12, 'red-gem')
            // props.updatePlayer({'has_red_gem': true})
            setSlot('N')
            props.updatePlayer({'wall_fountains_combination_entered': fullCombo()})
        } else if (slot === 'B'){
            // if the slot is not empty, pick up the gem in the slot
            props.pickupItem(16, 'blue-gem')
            // props.updatePlayer({'has_blue_gem': true})
            setSlot('N')
            props.updatePlayer({'wall_fountains_combination_entered': fullCombo()})
        } else if (slot === 'N'){
            // if you are not holding a gem, "It looks like this fountain is missing something."
            props.setCommentary('It looks like this fountain bowl is missing something.')
        }
    }


    return (
        <>
        <div>
            { inspectMosaic ? 
            <>
                <div id="mosaic" className="front-page row justify-content-center">
                    <div className="main-gate col-11">
                        <h2>MOSAIC</h2>

                        <button className='back-button ms-5 btn-primary' onClick={() => {
                            setInspectMosaic(false)
                            props.setCommentary(<>&nbsp;</>)
                        }}><h3>BACK <i className='fa-solid fa-arrow-down'/> </h3></button>
                        <br />
                    </div>
                    {props.renderHotbarAndCommentary()}
                </div>
            </>
            :
                inspectWallFountains ? 
                <>
                <div id="wall-fountains" className="front-page row justify-content-center">
                    <div className="main-gate col-11">
                        <h2>WALL FOUNTAINS</h2>
                        <div className="text-center d-flex justify-content-around">
                            <button className='btn-light wall-fountain-buttons' onClick={()=>{
                                handleWallSlots(wallSlot1, setWallSlot1)
                            }}><h3><i className={`fa-regular fa-${translateWallCode(wallSlot1)}`} /></h3></button>

                            <button className='btn-light wall-fountain-buttons' onClick={()=>{
                                handleWallSlots(wallSlot2, setWallSlot2)
                            }}><h3><i className={`fa-regular fa-${translateWallCode(wallSlot2)}`} /></h3></button>

                            <button className='btn-light wall-fountain-buttons' onClick={()=>{
                                handleWallSlots(wallSlot3, setWallSlot3)
                            }}><h3><i className={`fa-regular fa-${translateWallCode(wallSlot3)}`} /></h3></button>

                            <button className='btn-light wall-fountain-buttons' onClick={()=>{
                                handleWallSlots(wallSlot4, setWallSlot4)
                            }}><h3><i className={`fa-regular fa-${translateWallCode(wallSlot4)}`} /></h3></button>
                        </div>

                        <div className="text-center">
                            <button className='ms-5 btn-primary' onClick={() => {
                                setInspectWallFountains(false)
                                props.setCommentary(<>&nbsp;</>)
                                props.updatePlayer({'wall_fountains_combination_entered': fullCombo()})
                            }}><h3>BACK <i className='fa-solid fa-arrow-down'/> </h3></button>
                            <br />
                        </div>
                    </div>
                    {props.renderHotbarAndCommentary()}
                    </div>
                </>
                :
                <>
                    <div id="plaza" className="front-page row justify-content-center">
                        <div className="main-gate col-11">
                            <h2>COURTYARD</h2>

                            <div className="text-center">
                                <button className='btn-primary' onClick={() => {
                                    props.setAtLocation('porch')
                                    props.setCommentary(<>&nbsp;</>)
                                    props.updatePlayer({'current_location':'porch'})
                                }}><h3>PORCH <i className='fa-solid fa-arrow-up'/></h3></button>
                                <br />

                                {
                                    inspectBush ? 
                                    <span>
                                        <span className='bush my-2 bg-light fs-3 text-success fw-bold'>Bush</span>
                                        <button onClick={()=>{
                                            props.setCommentary(<>&nbsp;</>)
                                            setInspectBush(false)
                                        }}><i className="text-danger fa-solid fa-xmark"/></button>
                                    </span>
                                    :
                                    <>
                                    <button className='btn-success' onClick={() => {
                                        props.setCommentary('Classic conifer shrubs.')
                                        setInspectBush(true)
                                    }}><h3>Bush</h3></button>
                                    <br />
                                    </>

                                }
                            </div>

                            <div className="text-end">
                                <button className='btn-primary' onClick={() => {
                                    props.setAtLocation('gazebo')
                                    props.setCommentary(<>&nbsp;</>)
                                    props.updatePlayer({'current_location':'gazebo'})
                                }}><h3>GAZEBO &nbsp;<i className='fa-solid fa-arrow-turn-up'/> </h3></button>
                                <br />
                            </div>

                            <button className='btn-success' onClick={() => {
                                props.setCommentary("Nice wall fountains.")
                                setInspectWallFountains(true)
                            }}><h3>Wall Fountains</h3></button>
                            <br />
                            
                            <br /><br /><br />
                            <br /><br /><br /><br />

                            <div className="text-center">
                                <button className='btn-success' onClick={() => {
                                    setInspectMosaic(true)
                                    props.setCommentary("Nice mosaic.")
                                }}><h3>Mosaic</h3></button>
                                <br />

                                <button className='btn-primary' onClick={() => {
                                    props.setAtLocation('garden')
                                    props.setCommentary(<>&nbsp;</>)
                                    props.updatePlayer({'current_location':'garden'})
                                }}><h3>GARDEN <i className='fa-solid fa-arrow-down'/> </h3></button>
                                <br />
                            </div>

                            
                        </div>
                        {props.renderHotbarAndCommentary()}
                    </div>
                </>
            }
        </div>
        </>
    )
}
