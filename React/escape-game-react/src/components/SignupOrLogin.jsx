import React from 'react'
import { useState, useEffect } from 'react'

export default function SignupOrLogin(props) {
    // props.loggedIn
    const [showSignUpForm, setShowSignUpForm] = useState(false)
    const [pw, setPw] = useState()
    const [confirmPw, setConfirmPw] = useState()
    const [passwordsMatch, setPasswordsMatch] = useState(pw === confirmPw) // if pw and confirmpw match, then passwords don't not match
    
    useEffect(() => {
        if (!pw || !confirmPw){
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(pw === confirmPw)
        }
    }, [pw, confirmPw])

    const handleLoginSubmit = e => {
        console.log('Submit Log In Form');
    }
    
    const handleSignUpSubmit = e => {
        e.preventDefault()

        let password = e.target.password.value
        let confirmPassword = e.target.confirmPassword.value
        if (password !== confirmPassword){
            setPasswordsMatch(false)
        } else {

        }

        console.log('Submit Sign Up Form');
    }


    const loginForm = () => {
        console.log("clicked sign up");
        return (
            <>
                <h1 className='text-center text-light' id='formTitle'>Log In</h1>
                <form id='signUpForm' onSubmit={handleLoginSubmit}>
                        <input type="username" className="form-control mb-4 p-3" placeholder="Username" name='username' />
                        <input type="password" className="form-control mb-4 p-3" placeholder="Password" name='password'/>
                        <h4 className='py-1 mx-4' id='switch-signup-login' onClick={() => setShowSignUpForm(true)}>New Here? Sign Up here!</h4>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-warning mb-4 fs-3" id='submitSignup'>Log In</button>
                    </div>
                </form>
            </>
        )
    }

    
    const signUpForm = () => {
        console.log("clicked sign up");
        return (
            <>
                <h1 className='text-center text-light' id='formTitle'>Sign Up</h1>
                <form id='signUpForm' onSubmit={handleSignUpSubmit}>
                        <input type="email" className="form-control mb-4 p-3" placeholder="Email" name='email' />
                        <input type="username" className="form-control mb-4 p-3" placeholder="Username" name='username' />
                        <input type="password" className="form-control mb-4 p-3" placeholder="Password" name='password' onChange={(e) => setPw(e.target.value)}/>
                        <input type="password" className="form-control mb-4 p-3" placeholder="Confirm Password" name='confirmPassword' onChange={(e) => setConfirmPw(e.target.value)}/>
                        {passwordsMatch ? <></> : <h5 className='text-danger'>Your passwords don't match.</h5>}
                        <h4 className='py-1' id='switch-signup-login' onClick={() => setShowSignUpForm(false)}>Back again? Log In here!</h4>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-warning fs-3" id='submitSignup'>Sign Up</button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div id="signup-or-login" className='row align-content-center'>
                    {/* first column: images and such */}
                    <div className="col">
                        <h1 className="text-light">SOME IMAGE</h1>
                    </div>

                    {/* Second column: Whatever form you need. */}
                    <div id='formCol' className="col text-center text-light">
                        {showSignUpForm ? signUpForm() : loginForm()}
                    </div>
                </div>
            </div>
        </>
    )
}
