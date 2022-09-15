import React, { useState, useEffect } from 'react'


export default function Gate(props) {
    const [playerLocation, setPlayerLocation] = useState()
    const [inspectAddressSign, setInspectAddressSign] = useState(false)
    const [inspectStone, setInspectStone] = useState(false)
    const [inspectMailbox, setInspectMailbox] = useState(false)

    const [mailboxBoxCorrectCombination, setMailboxBoxCorrectCombination] = useState()
    const [boxCode1, setBoxCode1] = useState(0)
    const [boxCode2, setBoxCode2] = useState(0)
    const [boxCode3, setBoxCode3] = useState(0)
    const [boxCode4, setBoxCode4] = useState(0)

    const [hasKeyA, setHasKeyA] = useState()
    // (inspectMailbox, solvedMailboxBox, hasRedGem)
    const [solvedMailbox, setSolvedMailbox] = useState()
    const [hasRedGem, setHasRedGem] = useState()
    


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
            setMailboxBoxCorrectCombination(String(data['mailbox_box_correct_combination']))
            let mailboxComboEntered = String(data['mailbox_box_combination_entered'])
            // console.log(mailboxComboEntered)
            setBoxCode1(mailboxComboEntered.slice(0,1))
            setBoxCode2(mailboxComboEntered.slice(1,2))
            setBoxCode3(mailboxComboEntered.slice(2,3))
            setBoxCode4(mailboxComboEntered.slice(3,4))
            // console.log('GAME current Player Data for',attr,":",, 'saved as:', playerData)
            return mailboxComboEntered
        }).then((mailboxComboEntered) => {
            // console.log(boxCode1, boxCode2, boxCode3, boxCode4)
            // console.log('has key a:', retrieved)
            console.log('Gate FindPlayerData: location:', playerLocation)
            // setHotbar(renderHotbar())
        })
        
        // return hotbar1
    }

    
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


    return (
        <>
        <div className="">
            <div id="gate" className='front-page row justify-content-center'>
                {/* {props.updatePlayer({'current_location':"gate"})} */}
                <div className="main-gate col-11">
                    <h2>GATE</h2>

                    {
                    inspectAddressSign ? 
                    <>
                            <br />
                            <button><span className='fs-3' onClick={()=>{
                                props.setCommentary("I can't unscrew it with my bare hands.")
                            }}>(screw) 3412 (screw)</span></button>
                            
                            <button onClick={()=>{
                                props.setCommentary(<>&nbsp;</>)
                                setInspectAddressSign(false)
                            }}><i className="text-danger fa-solid fa-xmark"/></button>
                    </>
                    : 
                    <>
                    <br/>
                    <button><h3 onClick={() => {
                        props.setCommentary('There seem to be some symbols behind this sign.')
                        setInspectAddressSign(true)}}>House Address: 3412</h3></button>
                    </>
                    }


                    <div className="text-end me-5">
                    {
                        // Am I inspecting the mailbox?
                        inspectMailbox ? 
                            // if yes, then did i solve the mailbox box?
                            solvedMailbox ?
                                // if yes, then do i have the red gem?
                                hasRedGem ?
                                    // if yes, "There's nothing else here"
                                    props.setCommentary("There's nothing else here.")
                                    :
                                    // if no, then the red gem is in there.
                                    <>
                                    <br />
                                    <button><span className='fs-3' onClick={() => {
                                        props.updatePlayer({'has_red_gem': true})
                                        setHasRedGem(true)
                                        props.pickupItem(12)
                                        props.setRerenderHotbar(props.rerenderHotbar+1)
                                    }}>Red Gem</span></button>
                                    <button onClick={()=>
                                        setInspectMailbox(false)
                                    }><i className="text-danger fa-solid fa-xmark"/></button>
                                    </>
                                :
                                // if no then there is a box there with 4 wavy symbols, and clicking on each symbol gives me a different symbol of a set of 9.
                                <>
                                <br />
                                <h3 className="fs-3 text-dark" onClick={() => {
                                    props.setCommentary("I don't know the combination.")
                                }}>Box inside Mailbox </h3>

                                <button onClick={() => {
                                    let comboEntered = String(String(boxCode1) + String(boxCode2) + String(boxCode3) + String(boxCode4))
                                    props.setCommentary("That didn't work.")
                                    // if (comboEntered !== mailboxBoxCorrectCombination){
                                    //     props.setCommentary("That didn't work.")
                                    // } else {
                                    //     props.setCommentary("It's open!")
                                    // }
                                    props.updatePlayer({'mailbox_box_combination_entered': comboEntered})
                                }}><i className="text-success fa-solid fa-check"/></button>

                                <span>&ensp;&ensp;</span>

                                <button onClick={() => { 
                                    boxCode1 === 9 ? setBoxCode1(0) : setBoxCode1(Number(boxCode1) + 1)
                                    props.setCommentary(<>&nbsp;</>)
                                }}>{boxCode1}</button>
                                <button onClick={() => { 
                                    boxCode2 === 9 ? setBoxCode2(0) : setBoxCode2(Number(boxCode2) + 1)
                                    props.setCommentary(<>&nbsp;</>)
                                }}>{boxCode2}</button>
                                <button onClick={() => { 
                                    boxCode3 === 9 ? setBoxCode3(0) : setBoxCode3(Number(boxCode3) + 1)
                                    props.setCommentary(<>&nbsp;</>)
                                }}>{boxCode3}</button>
                                <button onClick={() => { 
                                    boxCode4 === 9 ? setBoxCode4(0) : setBoxCode4(Number(boxCode4) + 1)
                                    props.setCommentary(<>&nbsp;</>)
                                }}>{boxCode4}</button>
                                
                                <span>&ensp;&ensp;</span>

                                <button onClick={() => {
                                    setInspectMailbox(false)
                                    props.setCommentary(<>&nbsp;</>)
                                    props.updatePlayer({'mailbox_box_combination_entered': String(boxCode1) + String(boxCode2) + String(boxCode3) + String(boxCode4)})
                                    }}><i className="text-danger fa-solid fa-xmark"/></button>
                                </>
                            // if no, there is a closed mailbox there which onClick sets inspectMailbox to true
                            :
                            <>
                            <br />
                            <button><h3 onClick={()=>{
                                setInspectMailbox(true)
                            }}>Mailbox</h3></button>
                            </>
                    }
                    </div>



                    <div className="text-center">

                        <button><h3 onClick={() => {
                        if (props.selectedKeyA && !props.solvedGateKeyhole){
                            props.setCommentary("It's open.")
                            props.setSolvedGateKeyhole(true)
                            // props.setSelectedKeyA(false)
                            props.dropItem('key-a')
                            props.updatePlayer({'solved_gate_keyhole':true})
                        } else if (!props.solvedGateKeyhole) {
                            props.setCommentary("It's locked.")
                        } else if (props.solvedGateKeyhole){
                            props.setCommentary("It's open.")
                        }}}>Gate Door</h3></button>
                    </div>



                    {
                        // Did i solve the gate keyhole?
                        // if yes, arrow to go through the gate.
                        props.solvedGateKeyhole ? 
                        <>
                            <div className="text-center">
                            <br />
                            <br />
                            <br />
                            <br />
                            <button><h3 onClick={() => {
                                props.setAtGate(false)
                                props.setAtGarden(true)
                                props.updatePlayer({'current_location':'garden'})
                            }}>ENTER GATE <i className="fa-solid fa-arrow-up" /></h3></button>
                            </div>
                        </>
                        :
                        <></>
                    }


                    <div className="text-end me-5">
                    {
                        // Am i inspecting the stone
                        inspectStone ?
                            // if yes, then did i pick up the key?
                            hasKeyA ? 
                            // if yes, then there is no key there
                                <>
                                <br />
                                <button onClick={()=>{
                                    setInspectStone(false)
                                    props.setCommentary(<>&nbsp;</>)
                                }}><i className="text-danger fa-solid fa-xmark"/></button>
                                </>
                                :
                            // if no, then there is a key there.
                                <>
                                <br />
                                <button><span className='fs-3' onClick={()=>{
                                    // onClick, pick up the key and set hasKey to true in the db and here.
                                    props.updatePlayer({'has_key_a': true})
                                    setHasKeyA(true)
                                    props.pickupItem(3)
                                    props.setRerenderHotbar(props.rerenderHotbar+1)
                                    props.setCommentary('The security at this place is astounding')
                                }}>KEY-A</span></button>
                                <button onClick={()=>{
                                    setInspectStone(false)
                                    props.setCommentary(<>&nbsp;</>)
                                }}><i className="text-danger fa-solid fa-xmark"/></button>
                                </>
                        // if no, then there is a stone there
                        :
                        <>
                            <br />
                            <button><h3 onClick={()=>{
                                setInspectStone(true)
                                if (!hasKeyA){
                                    props.setCommentary('What do we have here...?')
                                } else {
                                    props.setCommentary("There's nothing else under this rock.")
                                }
                            }}>Stone</h3></button>
                        </>
                    }
                    </div>
                </div>

                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
    )
}
