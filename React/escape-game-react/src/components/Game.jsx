import React from 'react'

export default function Game(props) {
    const logout= () => {
        console.log('clicked LOG OUT');
        props.logout()
    }
    return (
        <>
            <div>Game</div>
            <p onClick={() => {logout()}}>Logout</p>
        </>
        
    )
}
