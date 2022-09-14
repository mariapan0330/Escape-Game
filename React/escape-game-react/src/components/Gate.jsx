import React, { useState, useEffect } from 'react'


export default function Gate(props) {
    const [playerLocation, setPlayerLocation] = useState()
    const [inspectAddressSign, setInspectAddressSign] = useState(false)
    const [inspectStone, setInspectStone] = useState(false)
    const [hasKeyA, setHasKeyA] = useState()
    const [selectedKeyA, setSelectedKeyA] = useState()
    const [solvedGateKeyHole, setSolvedGateKeyhole] = useState()
    


    const findPlayerData = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
        .then(res => res.json())
        .then(data => {
            // setNewGame(data["new_game"])
            setPlayerLocation(data['current_location'])
            setHasKeyA(data['has_key_a'])
            // console.log('GAME current Player Data for',attr,":",, 'saved as:', playerData)
            return data['has_key_a']
        }).then((retrieved) => {
            console.log('has key a:', retrieved)
            console.log('Gate FindPlayerData: location:', playerLocation)
            // setHotbar(renderHotbar())
        })
        
        // return hotbar1
    }


    // useEffect(() => {
    //     findPlayerData()
    // }, [inspectAddressSign])
    
    useEffect(() => {
        const playerDataOnMount = new Promise((resolve, reject) => {
            findPlayerData()
            resolve('GATE: Found player data')
        })
        playerDataOnMount.then((msg) =>
            console.log(msg)
            // if (playerLocation === "inspect-address"){
            //     setInspectAddressSign(true)
            // }
        )
    }, [])

    // wait for the last hotbar slot to updated with the data from the api, then render the hotbar:
    // useEffect(() => {
    //     setHotbar(renderHotbar())
    // },[hotbar7, hasKeyA])


    return (
        <>
        <div className="">
            <div id="gate" className='front-page row justify-content-center'>
                {/* {props.updatePlayer({'current_location':"gate"})} */}
                <div className="main-gate col-11">
                    <h1>GATE</h1>

                    <h3 onClick={() => {props.setCommentary("It's locked.")}}>Gate Door</h3>

                    {/* <h3 onClick={() => {props.setCommentary("There seem to be some symbols behind this sign.")}}>Address Sign</h3>                     */}
                    {
                    inspectAddressSign ? 
                    <>
                            <span className='fs-3' onClick={()=>{
                                props.setCommentary("I can't unscrew it with my bare hands.")
                            }}>SCREWS </span>
                            
                            <button onClick={()=>{
                                props.setCommentary(<>&nbsp;</>)
                                setInspectAddressSign(false)
                            }}>X</button>
                    </>
                    : 
                    <h3 onClick={() => {
                        props.setCommentary('There seem to be some symbols behind this sign.')
                        setInspectAddressSign(true)}}>House Address: 1234</h3>
                    }


                    <h3>Mailbox</h3>
                    {/* <h3>Stone</h3> */}
                    {
                        // Am i inspecting the stone
                        inspectStone ?
                            // if yes, then did i pick up the key?
                            hasKeyA ? 
                            // if yes, then there is no key there
                                <>
                                <button onClick={()=>{
                                    setInspectStone(false)
                                }}>X</button>
                                </>
                                :
                            // if no, then there is a key there.
                                <>
                                <span className='fs-3' onClick={()=>{
                                    // onClick, pick up the key and set hasKey to true in the db and here.
                                    props.updatePlayer({'has_key_a': true})
                                    setHasKeyA(true)
                                    props.pickupItem(3)
                                    props.setRerenderHotbar(props.rerenderHotbar+1)
                                    props.setCommentary('The security at this place is astounding')
                                }}>KEY-A</span>
                                <button onClick={()=>{
                                    setInspectStone(false)
                                }}>X</button>
                                </>
                        // if no, then there is a stone there
                        :
                        <>
                            <h3 onClick={()=>{
                                setInspectStone(true)
                                props.setCommentary('What do we have here...?')
                            }}>Stone</h3>
                        </>

                    // inspectStone ? 
                    //     hasKeyA ?
                    //     // if i've already picked up key A, there is nothing under the rock.
                    //     <span className='fs-1' onClick={() => {
                    //         setInspectStone(false)
                    //         setCommentary(<>&nbsp;</>)}}>X</span>
                    //     :
                    //     // if i haven't picked up key A, I see key A under the rock.
                    //     <>
                    //         <span className='fs-1' onClick={() => {
                    //             setCommentary("The security at this place is astounding.")
                    //             pickupItem(3)
                    //             setHasKeyA(true)
                    //             props.updatePlayer({"has_key_a": true})
                    //         }}>KEY-A &nbsp;&nbsp;</span>
                    //         <span className='fs-1' onClick={() => {
                    //             setInspectStone(false)}}>X</span>
                    //     </>
                    // :
                    // // setCommentary('There\'s a stone here.')
                    // <h3 onClick={() => setInspectStone(true)}>Stone</h3>
                    }
                </div>

                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
    )
}
