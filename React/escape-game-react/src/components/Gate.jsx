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
    const [playerLocation, setPlayerLocation] = useState()
    const [inspectAddressSign, setInspectAddressSign] = useState(false)
    const [inspectStone, setInspectStone] = useState(false)
    const [pickedUpKeyA, setPickedUpKeyA] = useState(false)
    
    const hotbarSlots = [hotbar1, hotbar2, hotbar3, hotbar4, hotbar5, hotbar6, hotbar7]
    
    const [hotbar, setHotbar] = useState()


    const renderHotbar = () => {
        return (
            <>
            {hotbarSlots.filter((slot) => slot !== 'default-none').map((slot) => <div className="hotbar row text-warning">{slot}</div>)}
            {hotbarSlots.filter((slot) => slot === 'default-none').map((slot) => <div className="hotbar row">{slot}</div>)}
            </>
        )
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
            // setNewGame(data["new_game"])
            setHotbar1(data['hotbar_slot_1']['piece_name'])
            setHotbar2(data['hotbar_slot_2']['piece_name'])
            setHotbar3(data['hotbar_slot_3']['piece_name'])
            setHotbar4(data['hotbar_slot_4']['piece_name'])
            setHotbar5(data['hotbar_slot_5']['piece_name'])
            setHotbar6(data['hotbar_slot_6']['piece_name'])
            setHotbar7(data['hotbar_slot_7']['piece_name'])
            setPlayerLocation(data['current_location'])
            // console.log('GAME current Player Data for',attr,":",, 'saved as:', playerData)
            return data['hotbar_slot_1']['piece_name']
        }).then((promiseHotbar1) => {
            console.log('Gate FindPlayerData: location:', playerLocation)
            console.log('Gate FindPlayerData: hotbar1:', promiseHotbar1)
            setHotbar(renderHotbar())
        })
        
        return hotbar1
    }

    

    useEffect(() => {findPlayerData()}, [inspectAddressSign])
    
    useEffect(() => {
        findPlayerData()
        if (playerLocation === "inspect-address"){
            setInspectAddressSign(true)
        }
    }, [])

    // wait for the last hotbar slot to updated with the data from the api, then render the hotbar:
    useEffect(() => {
        setHotbar(renderHotbar())
    },[hotbar7])


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
                    props.updatePlayer({"hotbar_slot_1":`${item}`})
                } else if (slot === 2){
                    props.updatePlayer({"hotbar_slot_2":`${item}`})
                }
                break
            }
        }
        setHotbar(renderHotbar())
    }

    return (
        <>
        <div className="">
            <div id="gate" className='front-page row justify-content-center'>
                {/* {props.updatePlayer({'current_location':"gate"})} */}
                <div className="main-gate col-11">
                    <h1>GATE</h1>

                    <h3 onClick={() => {setCommentary("It's locked.")}}>Gate Door</h3>
                    
                    {inspectAddressSign ? 
                    <>
                        {/* If we are inspecting the address sign, set current location to inspect-address */}
                        {/* {props.updatePlayer({"current_location":"inspect-address"})} */}
                        {/* {setInspectStone(false)} */}
                        <span className='fs-1' onClick={() => {
                            setCommentary("I can't unscrew it with my bare hands.")
                            console.log("SCREW")}}>SCREWS &nbsp;&nbsp;</span>
                        <span className='fs-1' onClick={() => {
                            // props.updatePlayer({"current_location":"gate"})
                            findPlayerData()
                            setCommentary(<>&nbsp;</>)
                            setInspectAddressSign(false)}}  >X</span>
                    </>
                    : 
                    <h3 onClick={() => {
                        setCommentary('There seem to be some symbols behind this sign.')
                        setInspectAddressSign(true)}}>House Address: 1234</h3>
                    }


                    <h3>Mailbox</h3>


                    {inspectStone ? 
                        pickedUpKeyA ?
                        // if i've already picked up key A, there is nothing under the rock.
                        <span className='fs-1' onClick={() => {
                            setInspectStone(false)
                            setCommentary(<>&nbsp;</>)}}>X</span>
                        :
                        // if i haven't picked up key A, I see key A under the rock.
                        <>
                            <span className='fs-1' onClick={() => {
                                setCommentary("The security at this place is astounding.")
                                pickupItem(3)
                                setPickedUpKeyA(true)
                            }}>KEY-A &nbsp;&nbsp;</span>
                            <span className='fs-1' onClick={() => {
                                setInspectStone(false)}}>X</span>
                        </>
                    :
                    // setCommentary('There\'s a stone here.')
                    <h3 onClick={() => setInspectStone(true)}>Stone</h3>
                    }
                </div>

                {/* HOTBAR */}
                <div className="hotbar col">
                    {hotbar}
                </div>
                
                <div className="bottom-bar d-flex align-items-center">
                    <div className="character-commentary col justify-content-end">
                        <h3 className="mt-3">{commentary}</h3>
                    </div>
                    <div className="hint-box col-1" onClick={() => {setCommentary('I don\'t know either, man.')}}>
                        {playerLocation}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
