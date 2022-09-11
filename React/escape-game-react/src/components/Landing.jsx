import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index(props) {
    let navigate = useNavigate()
    // props.linkToSignUp
    return (
        <>
        <div className="d-flex justify-content-center">
            <div id="landing" className='row'>
                <div className="col text-center">
                    <h1>Lockwood</h1>
                    <h3>Mystery</h3>
                    {props.loggedIn ? navigate('/') : props.linkToSignUpLogin}
                </div>
                <div className="col"></div>
            </div>
        </div>
        </>
    )
}
