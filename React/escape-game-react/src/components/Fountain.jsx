import React, { useState, useEffect } from 'react'

export default function Fountain(props) {
    const [inspectBench, setInspectBench] = useState(false)
    const [inspectFountainPool, setInspectFountainPool] = useState(false)
    const [hasCoin, setHasCoin] = useState(false)
    const [inspectBushes, setInspectBushes] = useState(false)
    const [inspectBrick, setInspectBrick] = useState(false)
    const [solvedFountainDoor, setSolvedFountainDoor] = useState(false)
    const [solvedPillow, setSolvedPillow] = useState(false)

    const [hasBlueGem, setHasBlueGem] = useState(false)
    const [hasKeyC, setHasKeyC] = useState(false)
    const [hasTelescopeLens, setHasTelescopeLens] = useState(false)
    const [hotbarSlot1, setHotbarSlot1] = useState()
    const [hotbarSlot2, setHotbarSlot2] = useState()
    const [hotbarSlot3, setHotbarSlot3] = useState()

    useEffect(() => {
        findPlayerData()
    }, [])

    const findPlayerData = () => {
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        fetch("http://127.0.0.1:5000/auth/current-player", {
            method: "GET",
            headers: myHeaders
        })
        .then(res => res.json())
        .then(data => {
            // setPlayerLocation(data['current_location'])
            setHasCoin(data['has_coin'])
            setSolvedFountainDoor(data['solved_fountain_door'])
            setSolvedPillow(data['solved_fountain_bench_pillow'])
            setHasTelescopeLens(data['has_telescope_lens'])
            setHasBlueGem(data['has_blue_gem'])
            setHasKeyC(data['has_key_c'])
            setHotbarSlot1(data['hotbar_slot_1']['piece_name'])
            setHotbarSlot2(data['hotbar_slot_2']['piece_name'])
            setHotbarSlot3(data['hotbar_slot_3']['piece_name'])
        })
    }

    return (
        <>
        <div>
            <div id='fountain' className='front-page row justify-content-center'>
                <div className="main-gate col-11">
                <h2>Fountain</h2>
                <br /><br /><br /><br />
                <br /><br />
                { inspectBench ? <></> : <><br /><br /></> }

                <div className="text-end">
                {
                    inspectBushes ? 
                    <>
                        <span>
                            <span className='bushes fs-3 text-success fw-bold'>Bushes</span>
                            <button onClick={()=>{
                                props.setCommentary(<>&nbsp;</>)
                                setInspectBushes(false)
                            }}><i className="text-danger fa-solid fa-xmark"/></button>
                        </span>
                    </>
                    :
                    <>
                        <button className='btn-success' onClick={()=>{
                            props.setCommentary('I do love rose bushes.')
                            setInspectBushes(true)
                        }}><h3>Bushes</h3></button>
                    </>

                }
                </div>

                
                <div className="text-start">
                {
                    inspectBench ? 
                    <>
                    <h3 className='fs-3'>Bench with several engraved animals
                    </h3>
                    <span className='bg-light py-2' onClick={() => props.setCommentary('Cute decorative animals.')}>
                        <span className='fs-4 text-success'> moose </span>
                        <span className='fs-4 text-warning'>beetle </span>
                        <span className='fs-4 text-primary'>otter </span>
                        <span className='fs-4 text-danger'>bison </span>
                    </span>
                    <br />
                    {
                        solvedPillow ? 
                            hasBlueGem ?
                                hasKeyC ?
                                    // if i have key c, there is nothing there
                                    <>
                                    <button onClick={()=> 
                                        props.setCommentary("I've gotten everything I need from the pillow.")
                                    }><h3>Pillow</h3></button>
                                    </>
                                    :
                                // if i do not have key c, it is there
                                <>
                                <button onClick={()=>{
                                    setHasKeyC(true)
                                    props.pickupItem(14, 'key-c')
                                    props.updatePlayer({'has_key_c':true})
                                }}><h3>Key C</h3></button>
                                </>
                            :
                            // if I do not have the blue gem, it is there
                            <>
                            <button onClick={()=>{
                                setHasBlueGem(true)
                                props.pickupItem(16, 'blue-gem')
                                props.updatePlayer({'has_blue_gem':true})
                            }}><h3>Blue Gem</h3></button>
                            </>
                        :
                        // if i have not solved pillow
                        <button className='btn-light fs-4 me-1' onClick={() => {
                            if(props.selectedItem === 'knife'){
                                props.setCommentary("I cut the pillow open. What's this inside?")
                                props.dropItem('knife')
                                setSolvedPillow(true)
                            } else {
                                props.setCommentary("Hmm... I can feel something inside this pillow.")
                            }
                        }}><h3>Pillow</h3></button>
                    }



                    <button onClick={() => {
                        setInspectBench(false)
                        props.setCommentary(<>&nbsp;</>)
                        }}><i className='fa-solid text-danger fa-xmark' /></button>
                    </>
                    :
                    <>
                        <br />
                        <button className='btn-success' onClick={()=>setInspectBench(true)}><h3>Bench</h3></button>
                    </>
                }
                <br />
                </div>

                <div className="text-end me-5">
                {
                    // am i looking at the brick ?
                    inspectBrick ?
                    // if inspecting brick, did I solve the fountain door already?
                        solvedFountainDoor ? 
                        // if yes, did i get the lens already?
                            hasTelescopeLens ? 
                            // if yes, "There's nothing else behind this door"
                            <>
                            </>
                            :
                            // if no, there is a lens there
                            <>
                            <br />
                            <button className='btn-success'><span className='fs-3' onClick={() => {
                                props.updatePlayer({'has_telescope_lens': true})
                                setHasTelescopeLens(true)
                                props.pickupItem(15, 'telescope-lens')
                                props.setCommentary('A glass lens with some weird tiny symbols on it. Hmm...')
                            }}>Glass Lens <i class="fa-regular fa-circle" /></span></button>
                            <button onClick={()=>{
                                setInspectBrick(false)
                                props.setCommentary(<>&nbsp;</>)
                            }}><i className="text-danger fa-solid fa-xmark"/></button>
                            </>
                        :
                        // if i did not solve it, there is a keyhole there.
                        
                        <>
                        <button className='btn-success' onClick={() => {
                            if (props.selectedItem === 'default-none' || 
                                (hotbarSlot1 === 'default-none' && hotbarSlot2 === 'default-none' && hotbarSlot3 === 'default-none')) {
                                props.setCommentary("It's locked. I wonder how to open it...")
                            } else if (props.selectedItem === 'key-c'){
                                props.setCommentary("That worked!")
                                setSolvedFountainDoor(true)
                                props.updatePlayer({'solved_fountain_door':true})
                                props.dropItem('key-c')
                                console.log('try this')
                            } else {
                                props.setCommentary("That didn't work.")
                            }
                        }}><h3>Brick with Keyhole</h3></button>
                        <button onClick={()=>{
                            setInspectBrick(false)
                            props.setCommentary(<>&nbsp;</>)
                        }}><i className="text-danger fa-solid fa-xmark"/></button>
                        </>
                    // if not inspecting brick, there is a brick (on click, i am inspecting it.)
                    :
                    <button className='btn-success' onClick={() => {
                        if (solvedFountainDoor){
                            props.setCommentary("There's nothing else behind this door.")
                        } else {
                            props.setCommentary("Hey wait a minute!")
                            setInspectBrick(true)
                        }
                    }}><h3>Totally Normal Brick</h3></button>
                }
                <br />
                </div>


                <div className="text-center">
                {
                    // am i inspecting the fountain pool?
                    inspectFountainPool ? 
                        // if yes, do i have a coin already?
                        hasCoin ? 
                            // if yes, there is no coin in there
                            <>
                                <span className='bg-light text-success fs-3' onClick={() => {
                                    props.setCommentary("I already took what I need.")
                                    }}>&nbsp;Coins </span>
                                <button onClick={() => {
                                    setInspectFountainPool(false)
                                    props.setCommentary(<>&nbsp;</>)
                                    }}><i className='fa-solid text-danger fa-xmark' /></button>
                            </>
                            :
                        // If no coin already, there is a coin in there.
                            <>
                                <button className='btn-success' onClick={() => {
                                    setHasCoin(true)
                                    props.updatePlayer({'has_coin': true})
                                    props.pickupItem(9, 'coin')
                                    props.setCommentary("Don't mind if I do...")
                                    }}><h3>Coins</h3></button>
                                <button onClick={() => {
                                    setInspectFountainPool(false)
                                    props.setCommentary(<>&nbsp;</>)
                                    }}><i className='fa-solid text-danger fa-xmark' /></button>
                            </>
                    :
                    <button className='btn-success' onClick={() => {
                        setInspectFountainPool(true)
                        props.setCommentary("A shame all this luck ran out in the end.")
                    }}><h3>Fountain Pool</h3></button>

                }
                <br />


                <button className='btn-primary' onClick={() => {
                    props.setAtLocation('garden')
                    props.updatePlayer({'current_location':'garden'})
                    props.setCommentary(<>&nbsp;</>)
                }}><h3>GARDEN <i class="fa-solid fa-arrow-down"/></h3></button>
                </div>
                
                </div>
                {props.renderHotbarAndCommentary()}
            </div>
        </div>
        </>
    )
}
