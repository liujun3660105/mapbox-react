import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import data from './data/world.json'
mapboxgl.accessToken='pk.eyJ1IjoianRqIiwiYSI6ImNrNGw2YnB6YzBkbWYzbnM4eDI2cGZ3c3cifQ.Q1yjc-bFHp3q6LQ6Whm8lw'

export default class WorldMap extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const map = new mapboxgl.Map({
            container:'map',
            style:'mapbox://styles/mapbox/streets-v9',
            center:[5,34],
            zoom:1.5
        });
        map.on('load',()=>{
            map.addSource('countries',{
                type:'geojson',
                data:data
            });
            map.addLayer({
                id:'countries',
                type:'fill',
                source:'countries'
            });

        })

    }
    render() {
      
        return (
            <div id='map'>
                
            </div>
        )
    }
}
