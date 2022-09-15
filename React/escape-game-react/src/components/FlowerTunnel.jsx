import React, { useState } from 'react'

export default function FlowerTunnel(props) {
    const [inspectLock, setInspectLock] = useState(false)
    const [gateCode1, setGateCode1] = useState(1)
    const [gateCode2, setGateCode2] = useState(1)
    const [gateCode3, setGateCode3] = useState(1)
    const [gateCode4, setGateCode4] = useState(1)
    const [solvedFlowerTunnelGate, setSolvedFlowerTunnelGate] = useState(false)



    return (
        <>
        <div>
            <div id='flower-tunnel' className='front-page row justify-content-center'>
                <div className="main-gate col-11">
                    <h2>Flower Tunnel</h2>
                    <br />
                    <br />
                    <div id="flower-tunnel-buttons" className='text-center d-flex justify-content-around'>
                        <button className='btn-primary' onClick={() => {
                            props.setCommentary(<>&nbsp;</>)
                            props.setAtFlowerTunnel(false)
                            props.setAtGarden(true)
                            props.updatePlayer({'current_location':'garden'})
                        }}><h3>GARDEN <i className="fa-solid fa-arrow-down" /></h3></button>
                        
                        {
                            inspectLock ? 
                            <>
                                    <br />
                                    <span>
                                    <button onClick={() => {
                                        let comboEntered = String(String(gateCode1) + String(gateCode2) + String(gateCode3) + String(gateCode4))
                                        // props.setCommentary("That didn't work.")
                                        if (comboEntered !== '4685'){
                                            props.setCommentary("That didn't work.")
                                        } else {
                                            props.setCommentary("It's open!")
                                            setSolvedFlowerTunnelGate(true)
                                            props.updatePlayer({'solved_flower_gate_padlock':true})
                                        }
                                        props.updatePlayer({'flower_gate_padlock_combination_entered': comboEntered})
                                    }}><i className="text-success fa-solid fa-check"/></button>

                                    <span>&ensp;&ensp;</span>

                                    <button onClick={() => { 
                                        gateCode1 === 9 ? setGateCode1(0) : setGateCode1(Number(gateCode1) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}>{gateCode1}</button>
                                    <button onClick={() => { 
                                        gateCode2 === 9 ? setGateCode2(0) : setGateCode2(Number(gateCode2) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}>{gateCode2}</button>
                                    <button onClick={() => { 
                                        gateCode3 === 9 ? setGateCode3(0) : setGateCode3(Number(gateCode3) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}>{gateCode3}</button>
                                    <button onClick={() => { 
                                        gateCode4 === 9 ? setGateCode4(0) : setGateCode4(Number(gateCode4) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}>{gateCode4}</button>
                                    
                                    <span>&ensp;&ensp;</span>

                                    <button onClick={() => {
                                        setInspectLock(false)
                                        props.setCommentary(<>&nbsp;</>)
                                        props.updatePlayer({'mailbox_box_combination_entered': String(gateCode1) + String(gateCode2) + String(gateCode3) + String(gateCode4)})
                                        }}><i className="text-danger fa-solid fa-xmark"/></button>
                                    </span>
                                </> 
                            :
                            <button className='btn-success' onClick={() => {
                                setInspectLock(true)
                                props.setCommentary("It's locked. Looks like it takes a combination of 4 symbols.")
                            }}><h3>Gate Lock <i className="fa-solid fa-lock" /></h3></button>
                        }
                        {/* <br /> */}
                    </div>
                </div>
                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
    )
}
