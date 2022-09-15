import React, { useState } from 'react'

export default function EditUser(props) {
    // props.setEditUser
    const [areYouSureButt, setAreYouSureButt] = useState(false)

    const handleEditUserSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <h1 className='text-center text-light mt-5' id='formTitle'>Edit User</h1>
            <form id='signUpForm' className='mb-4' onSubmit={handleEditUserSubmit}>
                <p className='text-center text-light mb-0 ms-3 fs-5'>Email</p>
                {/* <input type="email" className="form-control mb-3 p-3" placeholder="Email" name='username' value={props.username} onChange={(e) => setUsername(e.target.value)}/> */}
                <p className='text-center text-light mb-0 ms-3 fs-5'>Username</p>
                {/* <input type="username" className="form-control mb-3 p-3" placeholder="Username" name='username' value={username} onChange={(e) => setUsername(e.target.value)}/> */}
                <p className='text-center text-light mb-0 ms-3 fs-5'>Password</p>
                {/* <input type="password" className="form-control mb-3 p-3" placeholder="Password" name='password' value={pw} onChange={(e) => setPw(e.target.value)}/> */}
                {/* {loginError ? <h5 className='text-danger'>{loginError}</h5> : <></>} */}
                {/* <h4 className='py-1 mx-4' id='switch-signup-login' onClick={() => setShowEdit(true)}>Newcomer? Sign Up here!</h4> */}
                <div className="d-flex justify-content-center">
                    {
                        areYouSureButt ? 
                        <>
                        <span className='text-center'>
                            <h3 className='text-danger'>Are you sure??</h3>
                            <p className='text-light fs-5'>When you delete your account, <br /> all progress will be lost!</p>
                            <button className='btn btn-danger' onClick={() => {
                                props.deletePlayer()
                                props.setEditUser(false)
                                }}>DELETE</button>
                            <button className='btn btn-dark' onClick={() => setAreYouSureButt(false)}>Cancel</button>
                        </span>
                        </>
                        :
                        <button type="submit" className="btn btn-danger mb-4 fs-3" id='submitSignup' onClick={() =>
                            setAreYouSureButt(true)
                        }>Delete User</button>
                    }
                    <span>
                        <button type="submit" className="ms-3 btn btn-warning mb-4 fs-3" id='submitSignup'>Submit</button>
                        <button className="ms-3 btn btn-dark mb-4 fs-3" onClick={() => {props.setEditUser(false)}}>Cancel Edit</button>
                    </span>
                </div>
            </form>
        </>
    )
}
