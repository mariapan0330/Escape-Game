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
    const [playerId, setPlayerId] = useState()
    

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
        if (e){
            e.preventDefault()
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

        // STEP 1: Create New Player
        const createNewPlayer = new Promise((resolve, reject) => {
            resolve(newPlayer())
        })
        
        // STEP 1: Create New Player-Puzzles
        const createNewPlayerPuzzles = new Promise((resolve, reject) => {
            resolve(newPlayerPuzzles())
        })


        // newPlayerPuzzles()
    }
    
    // STEP 1: Create New Player
    // post request to api -> create Player
    const newPlayer = () => {
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
                    // Show the main game. Can i log in now too automatically instead of making the player do that
                    console.log('sign up successful')
                    setPlayerId(data['id'])
                    handleLoginSubmit()
                    .then(props.login())
                    .then(setShowSignUpForm(false))

                } else if (data.error === "Player with that username or email already exists."){
                    setSignUpError(data.error)
                }
            })
        return ('STEP 1: Create New Player')
    }


    
    const createRandomOrder = (comboLength) => {
/*
        Generates a random order for combinations of a given length. 
        This represents the order in which the player has to enter the symbols they find.
        The numbers must be unique.
        There are no combinations over 6 characters long. (yet...)
        For instance: 
            Player may find letters A, B, C, and D in one location,
            and in another location find that the letters should be arranded in the (randomly generated) order 1,4,2,3
            This means that they would have to enter the combination as A, D, B, C. 
*/


        // TODO: actually make this work
        // let allNums = ['1', '2', '3', '4', '5', '6']
        // let comboNums = allNums.slice(0, comboLength)
        // let result = ''
        // while (comboNums !== []){
        //     let rand = Math.floor(Math.random()*comboNums.length) // generate random number between 0 and length of the remaining list
        //     result += comboNums[rand] // add the element at that random index to the result
        //     comboNums.splice(rand,1) // remove the element at that index from the unique numbers
        // }

        // this technically works but clunky:
        // let num1 = ''
        //         let num2 = ''
        //         let num3 = ''
        //         let num4 = ''

        //         num1 = String(Math.floor(Math.random()*4) + 1)
        //         do {
        //             num2 = String(Math.floor(Math.random()*4) + 1)
        //             num3 = String(Math.floor(Math.random()*4) + 1)
        //             num4 = String(Math.floor(Math.random()*4) + 1)
        //         } while (([num2, num3, num4]).includes(num1) || ([num1, num3, num4]).includes(num2)
        //          || ([num1, num2, num4]).includes(num3) || ([num1, num2, num3]).includes(num4))
        //         console.log(num1 + num2 + num3 + num4)

        // simulate returning a random order:
        return '1432'
    }

    
    // STEP 2: link the player to puzzle 1 (<<gate-keyhole>>), puzzle 2 (<<mailbox-box>>), and puzzle 3 (<<address-screws>>)
    // post request to api -> link Player to Puzzles
    const newPlayerPuzzles = () => {
        let createdPlayerPuzzles = []
        for (let puzzId of [1,2,3]){
            
            let myHeaders = new Headers()
            // myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`)
            myHeaders.append("Content-Type", 'application/json')

            let correctCombo = ''
            if (puzzId === 1){
                correctCombo = 'use-key-a-on-gate-keyhole'
            } else if (puzzId === 2){
                correctCombo = createRandomOrder(4)
            } else if (puzzId === 3){
                correctCombo = 'use-coin-on-address-screws'
            }
            
            var playerPuzzleData = JSON.stringify({
                "player_id": playerId,
                "puzzle_id": puzzId,
                "correct_combination": correctCombo,
                "player_saw_puzzle": false,
                "player_completed_puzzle":false
            })
            // create Player-Puzzle
            fetch('http://127.0.0.1:5000/player_puzzle', {
                method: "POST",
                headers: myHeaders,
                body: playerPuzzleData
            })
            .then(res => res.json())
            .then(data => {
                    if (data.ok){
                        console.log('New player-puzzle:', playerId, '-', puzzId)
                        createdPlayerPuzzles.push(data['player_puzzle_id'])
                    }
                })
        }
        return createdPlayerPuzzles
    }

    // STEP 3: a) link player's puzzle 1 (<<gate-keyhole>>) to piece 3 (<key-a>)
    //         b) link player's puzzle 2 (<<mailbox-box>>) to piece 4 (<address>)
    const newPlayerPuzzlePieces = () => {
        // This has to change when I introduce puzzles with multiple pieces each.
        // TODO: how do i know what the curren player's puzzle ids are.
        let playerPuzzleIds = [1,2]
        for (let playerPuzzleId of playerPuzzleIds){
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')

            let pieceId;
            if (playerPuzzleId === 1){
                // link <<gate-keyhole>> to <key-a>
                pieceId = 3
            } else if (playerPuzzleId === 2){
                // link <<mailbox-box>> to <address>
                pieceId = 4
            }

            var sendData = JSON.stringify({
                "player_puzzle_id": playerPuzzleId,
                "piece_id": pieceId,
                "player_saw_piece": false,
                "player_has_piece": false
            })

            fetch('http://127.0.0.1:5000/player_puzzle_piece', {
                method: "POST",
                headers: myHeaders,
                body: sendData
            })
            .then(res => res.json())
            .then(data => {
                console.log('Linking player-puzzle:', playerPuzzleId, 'to piece:', pieceId)
            })
        }
        return "STEP3: Create New Player-Puzzle-Pieces"
    }



    const loginForm = () => {
        // console.log("clicked sign up");
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
