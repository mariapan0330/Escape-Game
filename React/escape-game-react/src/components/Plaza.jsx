import React from 'react'

export default function Plaza(props) {
    return (
        <>
        <div>
            <div id="plaza" className="front-page row justify-content-center">
                <div className="main-gate col-11">
                    <h2>PLAZA</h2>
                </div>
                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
    )
}
