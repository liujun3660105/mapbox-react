import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';

export default class PopupInfo extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnclick: false
        });
        const {position, feature, map} = this.props;
        popup.setLngLat(position).setHTML(`
            <div>aaa</div>
        `).addTo(map);

        return (
            <div>
                
            </div>
        )
    }
}
