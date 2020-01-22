import React from 'react'
import mapboxgl from 'mapbox-gl';
import {useState, useEffect} from 'react'
import './mapfun.css'
mapboxgl.accessToken = 'pk.eyJ1IjoianRqIiwiYSI6ImNrNGw2YnB6YzBkbWYzbnM4eDI2cGZ3c3cifQ.Q1yjc-bFHp3q6LQ6Whm8lw'


export default function MapFun() {
    const [date, setDate] = useState(new Date());
    let [num,setNum] = useState(1)
    useEffect(()=>{
        const map = new mapboxgl.Map({
            container:'map',
            style:'mapbox://styles/mapbox/streets-v9',
            center:[117,39],
            zoom:12
        })
        const timer = setInterval(()=>{
        },1000)
        
    },[])
    // useEffect(()=>{
        
    // })
    

    return (
        <div>
            <div id='map'>
            
            </div>
            <p>{num}</p>

        </div>

    )
}
