import React, { useState, useEffect } from 'react'


export default function Garden(props) {
    const [inspectBushes, setInspectBushes] = useState(false)
    const [solvedBerryBush, setSolvedBerryBush] = useState(false)

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
            // setPlayerLocation(data['current_location'])
            setSolvedBerryBush(data['solved_berry_bush'])            
        })
    }
    

    return (
        <>
        <div className="">
            <div id="garden" className='front-page row justify-content-center'>
                <div className="main-gate col-11">
                    <h2>GARDEN</h2>
                    <div className="directions">
                        <span>&emsp;&emsp;&emsp;&emsp;</span>
                        <span>&emsp;&emsp;&emsp;&emsp;</span>


                        <button className='ms-5 btn-primary' onClick={() => {
                            props.setCommentary(<>&nbsp;</>)
                            props.setAtLocation('plaza')
                            props.updatePlayer({'current_location':'plaza'})
                        }}><h3>COURTYARD <i class="fa-solid fa-arrow-up"/></h3></button>
                        <br />


                        <div className="d-flex justify-content-between">
                            <button className='btn-primary' onClick={() => { 
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtLocation('fountain')
                                props.updatePlayer({'current_location':'fountain'})
                                }}><h3>FOUNTAIN <i class="fa-solid fa-arrow-left"/></h3></button>


                            <button className='btn-primary'onClick={() => {
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtLocation('flower-tunnel')
                                props.updatePlayer({'current_location':'flower-tunnel'})
                            }}><h3>FLOWER TUNNEL <i class="fa-solid fa-arrow-right"/></h3></button>
                        </div>


                        <div className="d-flex justify-content-around">
                            <button className='ms-5 btn-primary' onClick={() => {
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtLocation('gate')
                                props.updatePlayer({'current_location':'gate'})
                            }}><h3>GATE <i class="fa-solid fa-arrow-down"/></h3></button>

                            {
                                // if yes, have i solved berry bush
                                inspectBushes ? 
                                    solvedBerryBush ? 
                                    // yes solved berry bush
                                    <>
                                        <span>
                                            <span className='bushes fs-3 text-success fw-bold'>Bushes</span>
                                            <button onClick={()=>{
                                                props.setCommentary(<>&nbsp;</>)
                                                setInspectBushes(false)
                                            }}><i className="text-danger fa-solid fa-xmark"/></button>
                                        </span>
                                    </>
                                    :
                                    // no not yet solved
                                    <>
                                        <span>
                                        {/* <button className='ms-5 btn-success' onClick={()=>{
                                            props.setCommentary('Ooh neat berry bushes.')
                                            setInspectBushes(true)
                                        }}><h3>Bushes</h3></button> */}
                                        <span className='bush my-2 bg-light fs-3 text-success fw-bold'>Bushes</span>
                                        <button onClick={()=>{
                                                props.setCommentary(<>&nbsp;</>)
                                                setInspectBushes(false)
                                            }}><i className="text-danger fa-solid fa-xmark"/></button>
                                        </span>
                                    </>
                                :
                                //not inspecting bushes
                                <>
                                    <button className='ms-5 btn-success' onClick={()=>{
                                        if (props.selectedItem === 'magnet'){
                                            props.setCommentary("It worked! I have the key now.")
                                            props.dropItem('magnet')
                                            props.pickupItem(10, 'key-b')
                                            setSolvedBerryBush(true)
                                            props.updatePlayer({'solved_berry_bush': true})
                                            props.setSelectedItem('key-b')
                                            setInspectBushes(true)
                                        } else {
                                            props.setCommentary('Ooh neat berry bushes.')
                                            setInspectBushes(true)
                                        }
                                    }}><h3>Bushes</h3></button>
                                </>

                            }

                        </div>
                    </div>
                </div>
                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
  )
}