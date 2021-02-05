import React ,{Component} from 'react'
import {Bar , Line } from 'react-chartjs-2'


class Chart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.slicingTemp = this.slicingTemp.bind(this);
    }
    slicingTemp(value){
        return parseFloat(value.slice(0,7));

    }
    
    render() {
        let {temperature,time} = this.props
        // console.log(temperature)
        // console.log(time)
        temperature= temperature.map(this.slicingTemp);
        time= time.map(value => (value.slice(4)))
        temperature=temperature.reverse();
        time = time.reverse();
        
        return (
            
                 <div>
             <Line
  data={{
      labels:time,
      datasets:[{
          label:"Temperature in °F",
          data: temperature
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

export default Chart


// function Chart(props) {
//     return ( 
//         <div>
//             <Line
//   data={{
//       labels:[1,2,3,4,5,6],
//       datasets:[{
//           label:"#no of votes",
//           data: [100,27,30,40,50,60]
//       }]
//   }}
//   width={300}
//   height={200}
//   options={{ maintainAspectRatio: false }}
// />
            
//         </div>
//     )
// }

// export default Chart
//import React, { Component } from 'react'


