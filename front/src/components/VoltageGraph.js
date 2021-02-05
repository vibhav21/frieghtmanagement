import React, { Component } from 'react'
import {Bar , Line } from 'react-chartjs-2'

export class VoltageGraph extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.slicingVolt= this.slicingVolt.bind(this);
    }
    slicingVolt(value){
        return parseFloat(value.slice(0,7));

    }
    
    render() {
    let {voltage,time} = this.props
    voltage= voltage.map(this.slicingVolt);
    time= time.map(value => (value.slice(4)))
    voltage= voltage.reverse();
    time = time.reverse();

        return (    <div>
            <Line
 data={{
     labels:time,
     datasets:[{
         label:"Voltage",
         data: voltage
     }]
 }}
 width={300}
 height={200}
 options={{ maintainAspectRatio: false }}
/>
           
       </div>
        )
    }
}

export default VoltageGraph
