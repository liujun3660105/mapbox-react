import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl';
import Tooltip from './components/Tooltip'
// import PopupInfo from './components/PopupInfo'
mapboxgl.accessToken = 'pk.eyJ1IjoianRqIiwiYSI6ImNrNGw2YnB6YzBkbWYzbnM4eDI2cGZ3c3cifQ.Q1yjc-bFHp3q6LQ6Whm8lw'
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -100.486052,
            lat: 37.830348,
            zoom: 2,
            date: new Date(),
            position:[0,0],
            feature:null,
            map:null
        }

    }
    setTooltip(feature){
        ReactDOM.render(
            <Tooltip feature={feature}></Tooltip>,
            // React.createElement(
            //     Tooltip,{
            //         feature
            //     }
            // ),
            this.tooltipContainer
        );

    }
    componentDidMount() {
        this.tooltipContainer = document.createElement('div');
        const { lng, lat, zoom } = this.state;
        //初始化地图
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });
        this.setState({
            map:map
        })
        let hoveredStateId = null;
        //加载图层和资源
        map.on('load', () => {
            map.addSource('states', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
            });
            map.addLayer({
                'id': 'state-fills',
                'type': 'fill',
                'source': 'states',
                'layout:': {},
                'paint': {
                    'fill-color': '#627BC1',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5
                    ]
                }
            })
        })
        const pupup = new mapboxgl.Popup({
            closeButton: false,
            closeOnclick: false
        });
        map.on('mousemove', 'state-fills', (e) => {
            this.setState({
                position:[e.lngLat.lng,e.lngLat.lat]
            })
            this.setState({
                feature:e.features[0]
            })
            console.log(e);
            // const features = map.queryRenderedFeatures(e.point);
            if (e.features.length > 0) {
                if(hoveredStateId){
                    map.setFeatureState(
                        {source:'states', id: hoveredStateId},
                        {hover:false}
                    )
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState(
                    { source: 'states', id: hoveredStateId },
                    { hover: true }
                );
                let feature = e.features[0];
                this.setTooltip(feature);

                pupup.setLngLat(e.lngLat).setDOMContent(this.tooltipContainer).addTo(map);
                map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';

                
            }

            let { lng, lat } = e.lngLat;
            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })
        map.on('mouseleave', 'state-fills', (e) => {
            map.setFeatureState(
                { source: 'states', id: hoveredStateId },
                { hover: false }
            );
            pupup.remove();
            map.getCanvas().style.cursor='';


        })
    }
    render() {
        const { position, feature, map } = this.state;
        return (
            <div id='main'>
                <div id='map'>
                </div>
                <div id='coor-show-panel'>
                    {/* <span>{lng},{lat}</span>
                 */}
                    {/* <Tooltip feature={lng}></Tooltip> */}
                    {/* <PopupInfo position={position} feature={feature} map={map}></PopupInfo> */}
                </div>

            </div>
        )
    }
}
