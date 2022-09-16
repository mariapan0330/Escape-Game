import React, { useState, useEffect } from 'react'

export default function Porch(props) {
    const [hasMagnet, setHasMagnet] = useState(false)
    const [inspectNote, setInspectNote] = useState(false)
    const [inspectToolbox, setInspectToolbox] = useState(false)
    const [solvedToolbox, setSolvedToolbox] = useState(false)
    const [hasKnife, setHasKnife] = useState(false)

    const findPlayerData = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
        .then(res => res.json())
        .then(data => {
            setHasMagnet(data['has_magnet'])
            setSolvedToolbox(data['solved_toolbox'])
            setHasKnife(data['has_knife'])
        })
        // return playerData
    }

    useEffect(() => {
        findPlayerData()
    }, [])


    return (
        <>
        <div>
            <div id="porch" className="front-page row justify-content-center">
                <div className="main-gate col-11">
                    <h2>PORCH</h2>

                    <button className="btn-success ms-5" onClick={() => {
                        if (props.selectedItem === 'key-b'){
                            props.setCommentary("That didn't work.")
                        } else {
                            props.setCommentary("The door's locked. I'll have to find another way inside.")
                        }
                    }}><h3>Door</h3></button>
                    <br />

                    <br /><br /><br />
                    <div className="text-center">
                    {
                        // am i inspecting toolbox?
                        inspectToolbox ? 
                            // if looking, have I solved toolbox?
                            solvedToolbox ?
                                // if solved, did i take the knife?
                                hasKnife ? 
                                    // if ive taken the knife, there is no knife in there.
                                    <>
                                    <button className="btn-success" onClick={()=> {
                                        props.setCommentary("I took everything I need from the toolbox.")
                                    }}><h3>Toolbox</h3></button>
                                    <br />
                                    </>
                                    :
                                    // if I have not taken the knife, there is a knife in there I can pick up.
                                    <>
                                    <button className='btn-success' onClick={()=>{
                                        setHasKnife(true)
                                        props.pickupItem(13,'knife')
                                        props.updatePlayer({'has_knife': true})
                                    }}><h3>Knife &#128298;</h3></button>
                                    <br />
                                    </>
                            :
                            // if not solved, can solve 
                            <>
                                <button className="btn-success" onClick={() => {
                                    if (props.selectedItem === 'key-b'){
                                        props.setCommentary("That worked! It's open.")
                                        setSolvedToolbox(true)
                                        props.dropItem('key-b')
                                        props.updatePlayer({'solved_toolbox': true})
                                    } else if (props.selectedItem === 'magnet' || props.selectedItem === 'red-gem'){
                                        props.setCommentary("That didn't work.")
                                    } else {
                                        props.setCommentary("It's locked.")
                                    }
                                }}><h3>Toolbox</h3></button>
                                <br />
                            </>
                        :
                        // if not inspecting, there is a toolbox there.
                        <>
                            <button className="btn-success" onClick={() => {
                                setInspectToolbox(true)
                            }}><h3>Toolbox</h3></button>
                            <br />
                        </>
                    }


                    {
                        inspectNote ? 
                        <>
                        <button className="btn-light text-start p-3"><h3>Dear boss,<br />
                        &emsp; Sorry! I lost the key to the toolbox <br />
                        somewhere in the berry bushes.<br />
                        <h3 className='text-end'>Gardener</h3>
                        </h3></button>
                        <button onClick={()=>{
                            props.setCommentary(<>&nbsp;</>)
                            setInspectNote(false)
                        }}><i className="text-danger fa-solid fa-xmark"/></button>
                        </>
                        :
                        <>
                        <button className="btn-success" onClick={() => {
                            props.setCommentary(<>&nbsp;</>)
                            setInspectNote(true)
                        }}><h3>Note</h3></button>
                        <br /><br /><br /><br /><br />
                        </>
                    }
                    <br />
                    </div>

                    {
                        hasMagnet ? 
                        // if i have picked up the magnet, there is no magnet there
                        <></>
                        :
                        // if i have not picked up the magnet, there is a magnet there I can pick up
                        <>
                        <div className="text-center">
                            <button className="btn-success" onClick={() => {
                                setHasMagnet(true)
                                props.updatePlayer({'has_magnet': true})
                                props.pickupItem(6, 'magnet')
                                props.setCommentary("A sturdy little magnet.")
                            }}><h3>Magnet <i class="fa-solid fa-magnet" /></h3></button>
                        </div>
                        </>
                    }
                    <br />
                    <br />

                    <button className='porch-back-button btn-primary' onClick={()=> {
                        props.setCommentary(<>&nbsp;</>)
                        props.setAtLocation('plaza')
                        props.updatePlayer({'current_location':'plaza'})
                    }}><h3> COURTYARD <i className="fa-solid fa-arrow-down" /></h3></button>

                </div>
                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
    )
}
