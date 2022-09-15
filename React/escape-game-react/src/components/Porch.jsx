import React from 'react'

export default function Porch(props) {
    return (
        <>
        <div>
            <div id="porch" className="front-page row justify-content-center">
                <div className="main-gate col-11">
                    <h2>PORCH</h2>
                    <button className='btn-primary' onClick={()=> {
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
