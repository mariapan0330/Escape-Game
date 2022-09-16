import React, { useState, useEffect } from 'react'

export default function Gazebo(props) {
    const [inspectTelescopeView, setInspectTelescopeView] = useState(false)
    const [inspectTelescope, setInspectTelescope] = useState(false)
    const [solvedCarvedTreesNoOrder, setSolvedCarvedTreesNoOrder] = useState(false)

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
            setSolvedCarvedTreesNoOrder(data['solved_carved_trees_no_order'])
        })
    }


    return (
        <>
        <div>
            {
                inspectTelescopeView ? 
                    solvedCarvedTreesNoOrder ?
                    <>
                    <div id="telescope-yes-lens" className="front-page row justify-content-center">
                        <div className="main-gate col-11">

                            <div className="text-end me-5 telescope-back-button">
                                <div className="text-start">
                                        <button className='btn-success' onClick={() => {
                                            props.setCommentary('Interesting...')
                                        }}><h3>Trees</h3></button>
                                        <br />
                                </div>
                                <button className='btn-primary ' onClick={()=>{
                                    setInspectTelescopeView(false)
                                    props.setCommentary(<>&nbsp;</>)
                                }}><h3>Back <i className='fa-solid fa-arrow-down' /></h3></button>
                            </div>
                        </div>
                        {props.renderHotbarAndCommentary()}
                    </div>
                    </>
                    :
                    <>
                    <div id="telescope-no-lens" className="front-page row justify-content-center">
                        <div className="main-gate col-11">

                            <div className="mx-5 telescope-back-button">
                                <div className="text-start">
                                    <button className='btn-success' onClick={() => {
                                        props.setCommentary('Those trees have some letters carved into them. I wonder what they mean...')
                                    }}><h3>Trees</h3></button>
                                    <br />
                                </div>
                                <div className="text-end">
                                    <button className='btn-primary ' onClick={()=>{
                                        setInspectTelescopeView(false)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}><h3>Back <i className='fa-solid fa-arrow-down' /></h3></button>
                                </div>
                            </div>
                        </div>
                        {props.renderHotbarAndCommentary()}
                    </div>
                    </>
                    
                :
                <>
                <div id="gazebo" className="front-page row justify-content-center">
                    <div className="main-gate col-11">
                        <h2>GAZEBO</h2>
                        {
                            inspectTelescope ? 
                            <>
                            <div className="text-center">
                                <button className="btn-success" onClick={() =>{
                                    if (props.selectedItem === 'telescope-lens'){
                                        props.setCommentary('The lens fits here!')
                                        props.dropItem('telescope-lens')
                                        setSolvedCarvedTreesNoOrder(true)
                                        props.updatePlayer({'solved_carved_trees_no_order': true})
                                    } else {
                                        props.setCommentary("I wonder why there's an extra slot on this telescope...")
                                    }
                                    // props.setCommentary('I wonder why this telescope is aimed so low.')
                                }}><h3>Telescope Slot {solvedCarvedTreesNoOrder ? <> with Lens <i className="fa-regular fa-circle" /></> : <></>}</h3></button>
                                <span>&emsp;</span>

                                <button className="btn-success" onClick={() =>{
                                    setInspectTelescopeView(true)
                                    props.setCommentary(<>&nbsp;</>)
                                    // props.setCommentary('I wonder why this telescope is aimed so low.')
                                }}><h3>Look through telescope</h3></button>
                                <span>&emsp;</span>

                                <button className="text-danger" onClick={() =>{
                                    setInspectTelescope(false)
                                    props.setCommentary(<>&nbsp;</>)
                                    // props.setCommentary('I wonder why this telescope is aimed so low.')
                                }}><h3><i className='fa-solid fa-xmark'/></h3></button>
                                <br />

                            </div>
                            </>
                            :
                            <>
                            <div className="text-center">
                                <button className="btn-success" onClick={() =>{
                                    setInspectTelescope(true)
                                    // props.setCommentary('I wonder why this telescope is aimed so low.')
                                }}><h3>Telescope</h3></button>
                                <br />
                            </div>
                            </>
                        }
                        

                        <div className="ms-5">
                            <button className='back-button btn-primary' onClick={()=> {
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtLocation('plaza')
                                props.updatePlayer({'current_location':'plaza'})
                            }}><h3> COURTYARD <i className="fa-solid fa-arrow-down" /></h3></button>
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
