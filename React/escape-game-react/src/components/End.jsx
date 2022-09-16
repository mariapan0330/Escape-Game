import React, { useState } from 'react'

export default function End(props) {
    const [newGame, setNewGame] = useState('')

    return (
        <>
        <div>
            <div id="end" className="front-page row justify-content-center">
                <div className="main-gate col-11">
                    <h2>This is the end.</h2>
                    <h3>Congratulations!<br />
                    You're at the end of the stuff I finished making. <br/>
                    I hope you enjoyed it! </h3>
                    <br />
                    <button className='px-4 my-2 btn-light' onClick={()=>{
                        if (newGame === ''){
                            setNewGame("JK, I didn't set this up yet.")
                        } else {
                            setNewGame('')
                        }
                    }}><h3 id='start-over' className='fs-1'>Click here to start a new game</h3></button>

                    <h3>OR</h3>
                    
                    <button className='px-4 my-1 btn-primary' onClick={()=>{
                        props.updatePlayer({'current_location':'flower-tunnel'})
                        props.setAtLocation('flower-tunnel')
                    }}><h3 id='start-over' className='fs-1'>Click here to go back</h3></button>
                    <h3>{newGame}</h3>
                </div>
            </div>
        </div>
        </>
    )
}
