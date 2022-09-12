import React from 'react'

export default function Landing(props) {
    // props.linkToSignUp
    // props.linkToFooter


    return (
        <>
        <div className="d-flex justify-content-center">
            <div id="landing" className='front-page row'>
                <div className="col text-center">
                    <h1>Lockwood</h1>
                    <h2>Mystery</h2>
                    {props.loggedIn ? props.linkToFooter : props.linkToSignUpLogin}
                </div>
                <div className="col"></div>
            </div>
        </div>
        </>
    )
}
