import React from 'react'

export default function Index(props) {
    // props.linkToSignUp
    return (
        <>
        <div className="d-flex justify-content-center">
            <div id="landing" className='row'>
                <div className="col text-center">
                    <h1>Lockwood</h1>
                    <h3>Mystery</h3>
                    {props.linkToSignUp}
                </div>
                <div className="col"></div>
            </div>
        </div>
        </>
    )
}
