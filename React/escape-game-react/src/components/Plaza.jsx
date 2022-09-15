import React, { useState } from 'react'

export default function Plaza(props) {
    const [inspectMosaic, setInspectMosaic] = useState(false)
    const [inspectWallFountains, setInspectWallFountains] = useState(false)


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

                        <div className="text-center">
                            <button className='back-button ms-5 btn-primary' onClick={() => {
                                setInspectWallFountains(false)
                                props.setCommentary(<>&nbsp;</>)
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

                                <button className='btn-success'><h3>Bush</h3></button>
                                <br />
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
