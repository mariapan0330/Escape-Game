import React from 'react'
import { useState, useEffect } from 'react'

export default function Footer(props) {

    // const [currentPlayerData, setCurrentPlayerData] = useState()

    const logout= () => {
        console.log('clicked LOG OUT');
        props.setAtGate(false)
        props.logout()
    }

    const handleEditUser = () => {
        console.log('clicked EDIT user')
        props.setEditUser(true)
    }


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
