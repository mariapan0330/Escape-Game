import React, { useState, useEffect } from 'react'

export default function FlowerTunnel(props) {
    const [inspectLock, setInspectLock] = useState(false)
    const [gateCode1, setGateCode1] = useState(0)
    const [gateCode2, setGateCode2] = useState(0)
    const [gateCode3, setGateCode3] = useState(0)
    const [gateCode4, setGateCode4] = useState(0)
    let fullCombo = String(String(gateCode1) + String(gateCode2) + String(gateCode3) + String(gateCode4))

    // const [gateSymbol1, setGateSymbol1] = useState(<>&#8712;</>)
    // const [gateSymbol2, setGateSymbol2] = useState(<>&#8712;</>)
    // const [gateSymbol3, setGateSymbol3] = useState(<>&#8712;</>)
    // const [gateSymbol4, setGateSymbol4] = useState(<>&#8712;</>)
    const [solvedFlowerTunnelGate, setSolvedFlowerTunnelGate] = useState(false)

    const findPlayerData = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
        .then(res => res.json())
        .then(data => {
            let comboEntered = String(data['flower_gate_padlock_combination_entered'])
            setGateCode1(comboEntered.slice(0,1))
            setGateCode2(comboEntered.slice(1,2))
            setGateCode3(comboEntered.slice(2,3))
            setGateCode4(comboEntered.slice(3,4))
        })
        // return playerData
    }

    const translateNumber = (number) => {
        // &#8712; &#8715; &#8721; &#8756; &#8834; &#8745; &#8853; &#936;
        let codeKey = {
            1: <>&#8712;</>,
            2: <>&#8715;</>,
            3: <>&#8721;</>,
            4: <>&#8756;</>,
            5: <>&#8834;</>,
            6: <>&#8745;</>,
            7: <>&#8853;</>,
            8: <>&#936;</>
        }
        return codeKey[number]
    }

    useEffect(() => {
        findPlayerData()
    }, [])


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
                            props.setAtLocation('garden')
                            props.updatePlayer({'current_location':'garden'})
                            props.updatePlayer({'flower_gate_padlock_combination_entered': fullCombo})
                        }}><h3>GARDEN <i className="fa-solid fa-arrow-down" /></h3></button>
                        
                        {
                            inspectLock ? 
                            <>
                                    <br />
                                    <span>
                                    <button onClick={() => {
                                        // props.setCommentary("That didn't work.")
                                        if (fullCombo !== '4685'){
                                            props.setCommentary("That didn't work.")
                                        } else {
                                            props.setCommentary("It's open!")
                                            setSolvedFlowerTunnelGate(true)
                                            props.updatePlayer({'solved_flower_gate_padlock':true})
                                            props.updatePlayer({'current_location':'ending'})
                                            props.setAtLocation('ending')
                                        }
                                        props.updatePlayer({'flower_gate_padlock_combination_entered': fullCombo})
                                    }}><i className="text-success fa-solid fa-check"/></button>

                                    <span>&ensp;&ensp;</span>

                                    {/* &#8712;&#8715;&#8721;&#8756;&#8834;&#8745;&#8853;&#936; */}
                                    <button onClick={() => { 
                                        gateCode1 >= 8 ? setGateCode1(1) : setGateCode1(Number(gateCode1) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}><h3>{translateNumber(gateCode1)}</h3></button>

                                    <button onClick={() => { 
                                        gateCode2 >= 8 ? setGateCode2(1) : setGateCode2(Number(gateCode2) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}><h3>{translateNumber(gateCode2)}</h3></button>

                                    <button onClick={() => { 
                                        gateCode3 >= 8 ? setGateCode3(1) : setGateCode3(Number(gateCode3) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}><h3>{translateNumber(gateCode3)}</h3></button>

                                    <button onClick={() => { 
                                        gateCode4 >= 8 ? setGateCode4(1) : setGateCode4(Number(gateCode4) + 1)
                                        props.setCommentary(<>&nbsp;</>)
                                    }}><h3>{translateNumber(gateCode4)}</h3></button>
                                    
                                    <span>&ensp;&ensp;</span>

                                    <button onClick={() => {
                                        setInspectLock(false)
                                        props.setCommentary(<>&nbsp;</>)
                                        props.updatePlayer({'flower_gate_padlock_combination_entered': fullCombo})
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
