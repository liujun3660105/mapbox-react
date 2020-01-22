import React, { Component } from 'react'

export default class Tooltip extends Component {
    constructor(props){
        super(props);

    }
    renderFeautre(feature){
        console.log(feature);
        return(
            <div>
                <div className='tooltip-titile'>
                    <strong>{feature.properties.STATE_ID}</strong>
                </div>
                <div className='tooltip-body'>
                    <span>{feature.properties.STATE_NAME}</span>
                </div>
            </div>
        )

    }
    render() {
        const {feature} = this.props;
        // console.log(feature);
        
        return (
            <div>
                {this.renderFeautre(feature)}
                
            </div>
        )
    }
}
