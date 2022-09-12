import React from 'react'
import { useState, useEffect } from 'react'

export default function Footer(props) {

    // const [currentPlayerData, setCurrentPlayerData] = useState()

    const logout= () => {
        console.log('clicked LOG OUT');
        props.logout()
    }

    const handleEditUser = () => {
        console.log('clicked EDIT user')
        props.setEditUser(true)
    }

    // useEffect(() => {
    //     let myHeaders = new Headers()
    //     myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    //     fetch("http://127.0.0.1:5000/auth/current-player", {
    //         method: "GET",
    //         headers: myHeaders
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setCurrentPlayerData(data.username)
    //             console.log('Footer current player',currentPlayerData)
    //         })
    //         // console.log('current Player Data2:',currentPlayerData)
    // }, [])


    return (
        <>
                {props.loggedIn ? 
                <>
                <div id="footer">
                    <div className='d-flex justify-content-end'>
                        <div className="col">
                            <p className="pt-4 px-5 fs-3">{
                                // localStorage.getItem('token')
                            props.currentPlayerUsername
                            }&nbsp;&nbsp;
                            <span id='editUserButton' className='pt-4 fs-3' onClick={() => handleEditUser()}><i className="fa-solid fa-user-pen" /></span>
                            </p>
                        </div>
                        <p id='logOutButton' className='pt-4 px-5 fs-3' onClick={() => {logout()}}>Log Out &nbsp;<i className="fa-solid fa-right-from-bracket" /></p>
                    </div>
                </div>
                </> : <><p className='text-end pt-4 fs-3'></p></>}
        </>
        
    )
}
