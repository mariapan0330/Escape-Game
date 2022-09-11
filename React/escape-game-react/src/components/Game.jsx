import React from 'react'

export default function Game(props) {
    // props.linkToSignUp
    // props.linkToFooter


    return (
        <>
        <div className="d-flex justify-content-center">
            <div id="game" className='row'>
                <div className="col text-center">
                    <h1>Lockwood</h1>
                    <h3>Mystery</h3>
                    {/* {props.loggedIn ? props.linkToFooter : props.linkToSignUpLogin} */}
                </div>
                <div className="col"></div>
            </div>
        </div>
        </>
    )
}
