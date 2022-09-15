import React, { useState, useEffect } from 'react'


export default function Garden(props) {
    const [inspectBushes, setInspectBushes] = useState(false)
    

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
                            props.setAtPlaza(true)
                            props.setAtGarden(false)
                            props.updatePlayer({'current_location':'plaza'})
                        }}><h3>PLAZA <i class="fa-solid fa-arrow-up"/></h3></button>
                        <br />


                        <div className="d-flex justify-content-between">
                            <button className='btn-primary' onClick={() => { 
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtFountain(true)
                                props.setAtGarden(false)
                                props.updatePlayer({'current_location':'fountain'})
                                }}><h3>FOUNTAIN <i class="fa-solid fa-arrow-left"/></h3></button>


                            <button className='btn-primary'onClick={() => {
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtFlowerTunnel(true)
                                props.setAtGarden(false)
                                props.updatePlayer({'current_location':'flower-tunnel'})
                            }}><h3>FLOWER TUNNEL <i class="fa-solid fa-arrow-right"/></h3></button>
                        </div>


                        <div className="d-flex justify-content-around">
                            <button className='ms-5 btn-primary' onClick={() => {
                                props.setCommentary(<>&nbsp;</>)
                                props.setAtGarden(false)
                                props.setAtGate(true)
                                props.updatePlayer({'current_location':'gate'})
                            }}><h3>GATE <i class="fa-solid fa-arrow-down"/></h3></button>

                            {
                                inspectBushes ? 
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
                                <>
                                    <button className='ms-5 btn-success' onClick={()=>{
                                        props.setCommentary('Ooh neat berry bushes.')
                                        setInspectBushes(true)
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