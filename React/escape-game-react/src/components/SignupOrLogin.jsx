import React from 'react'
import { useState, useEffect } from 'react'
import basicKey from '../key.js'
import { useNavigate } from 'react-router-dom'

export default function SignupOrLogin(props) {
    // let navigate = useNavigate()
    // props.loggedIn
    const [showSignUpForm, setShowSignUpForm] = useState(false)
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [pw, setPw] = useState()
    const [confirmPw, setConfirmPw] = useState()
    // if pw and confirmpw match, then passwords don't not match
    const [passwordsMatch, setPasswordsMatch] = useState(pw === confirmPw) 
    const [missingField, setMissingField] = useState(false)
    const [signUpError, setSignUpError] = useState()
    const [loginError, setLoginError] = useState()
    

    useEffect(() => {
        if (!pw || !confirmPw){ // if the only reason the PWs don't match is that the user hasn't entered one, you don't have to tell them.
            setPasswordsMatch(true)
        } else { // but if they did enter both PWs and they don't match, tell them so.
            setPasswordsMatch(pw === confirmPw)
        }
    }, [pw, confirmPw])


    useEffect(() => {
        if (!email || !username || !pw || !confirmPw){
            setMissingField(true)
        } else {
            setMissingField(false)
        }
    }, [email, username, pw, confirmPw])


    useEffect(() => {
        console.log('sign up error:', signUpError)
    }, [signUpError])
    
    
    const handleLoginSubmit = e => {
        if (e){e.preventDefault()
            console.log('Submit Log In Form');
        }
        console.log("Logging in...")

        let myHeaders = new Headers()
        myHeaders.append("Authorization", `Basic ${basicKey(username, pw)}`)

        fetch("http://127.0.0.1:5000/auth/token", {
            method: "POST",
            headers: myHeaders
        })
            .then(res => res.ok ? res.json() : setLoginError("Username or password is incorrect!"))
            .then(data => {
                if (data.token){
                    localStorage.setItem('token', data.token)
                    props.login()
                    console.log('LOGIN SUCCESSFUL')
                } else {
                    setLoginError("That didn't work.")
                }
            })
    }

    
    const handleSignUpSubmit = e => {
        console.log('Submit Sign Up Form');
        e.preventDefault()

        if (missingField){
            return
        }

        // post request to api -> create Player
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var formData = JSON.stringify({
            username: username,
            email: email,
            password: pw
        })

        fetch('http://127.0.0.1:5000/auth/players', {
            method: "post",
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error){
                    // navigate to the main game. Can i log in now too automatically instead of making the player do that
                    console.log('sign up successful')
                    handleLoginSubmit()
                    props.login()
                    setShowSignUpForm(false)

                } else if (data.error === "Player with that username or email already exists."){
                    setSignUpError(data.error)
                }
            })
        }



    const loginForm = () => {
        console.log("clicked sign up");
        return (
            <>
                <h1 className='text-center text-light' id='formTitle'>Log In</h1>
                <form id='signUpForm' onSubmit={handleLoginSubmit}>
                    <p className='text-start mb-0 ms-3 fs-5'>Username</p>
                    <input type="username" className="form-control mb-3 p-3" placeholder="Username" name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <p className='text-start mb-0 ms-3 fs-5'>Password</p>
                    <input type="password" className="form-control mb-3 p-3" placeholder="Password" name='password' value={pw} onChange={(e) => setPw(e.target.value)}/>
                    {loginError ? <h5 className='text-danger'>{loginError}</h5> : <></>}
                    <h4 className='py-1 mx-4' id='switch-signup-login' onClick={() => setShowSignUpForm(true)}>Newcomer? Sign Up here!</h4>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-warning mb-4 fs-3" id='submitSignup'>Log In</button>
                    </div>
                </form>
            </>
        )
    }

    
    const signUpForm = () => {
        // console.log("clicked sign up");
        return (
            <>
                <h1 className='text-center text-light' id='formTitle'>Sign Up</h1>
                <form id='signUpForm' onSubmit={handleSignUpSubmit}>
                        <p className='text-start mb-0 ms-3 fs-5'>Email</p>
                        <input type="email" className="form-control mb-3 p-3" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p className='text-start mb-0 ms-3 fs-5'>Username</p>
                        <input type="username" className="form-control mb-3 p-3" placeholder="Username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p className='text-start mb-0 ms-3 fs-5'>Password</p>
                        <input type="password" className="form-control mb-3 p-3" placeholder="Password" name='password' value={pw} onChange={(e) => setPw(e.target.value)} />
                        <p className='text-start mb-0 ms-3 fs-5'>Confirm Password</p>
                        <input type="password" className="form-control mb-3 p-3" placeholder="Confirm Password" name='confirmPassword' value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
                        {passwordsMatch ? <></> : <h5 className='text-danger'>Your passwords don't match.</h5>}
                        {missingField ? <h5 className='text-danger'>You are missing a field.</h5> : <></>}
                        {signUpError ? <h5 className='text-danger'>{signUpError}</h5> : <></>}
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
