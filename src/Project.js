import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './index.css';
const Project = () => {
    const [lists1, setLists1] = useState([]);

    const [displays1, setDisplays1] = useState([]);



    const [lists, setLists] = useState([]);
    const [shows, setShows] = useState("");
    const [displays, setDisplays] = useState([]);
    const [tick, setTick] = useState(true);

    useEffect(() => {
        axios.get("https://api.tvmaze.com/search/shows?q=friends")
            .then((response) => {
                console.log(response.data);
                setLists(response.data);

            })
    }, [])

    useEffect(() => {
        axios.get("https://api.tvmaze.com/search/people?q=akon")
            .then((response) => {
                console.log(response.data);
                setLists1(response.data);

            })
    }, [])
    const submitbutton = () => {
        setDisplays(lists.filter((list) => list.show.name.toLowerCase().includes(shows)))
        setDisplays1(lists1.filter((list1) => list1.person.name.toLowerCase().includes(shows)))
    }

    return (
        <>
            <div className='main-box'>
                <div className='box'>
                    <h1>TVmaze</h1>
                    <h2>Search your favourite shows</h2>
                    <div className='ans'>
                        <input className='ans' type="checkbox" checked={tick} onChange={() => setTick(!tick)} />
                        <label>Actors</label>
                        <input className='ans' type="checkbox" checked={!tick} onChange={() => setTick(!tick)} />
                        <label>Shows</label>
                    </div>
                    <br></br>
                    <input type="text" onChange={(e) => setShows(e.target.value)} />
                    <button onClick={submitbutton}>Submit</button>
                </div>
                <div className='box1'>
                    {tick ?
                        <div className='actor'>
                            {
                                displays1.map((display1) => (
                                    display1.person.image !== null ?
                                        <li><img src={display1.person.image.medium} /></li> : <></>
                                ))
                            }
                        </div> : <div className='show'>

                            {
                                displays.map((display) => (
                                    display.show.image !== null ?
                                        <li><img src={display.show.image.medium} /></li> : <></>
                                ))

                            }
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Project