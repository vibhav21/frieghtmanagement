import React, { Component } from 'react'
import  Chart from './Chart'
import VoltageGraph from './VoltageGraph'
import Map from './Map'
 class Calling extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            truck_id:'',
            time:[],
             temp:[],
             volt:[],
             location:{
                 latitude:[],
                 longitude:[]
             }

        }
       // this.updatingstate = this.updatingstate.bind(this);
        this.getdata = this.getdata.bind(this);
    }
     getdata()
    {   const requestOptions = 
            {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(this.state)
            };
            console.log("hello")
            console.log(this.state.truck_id)
             fetch(`/data/${this.state.truck_id}`,requestOptions).then((res) =>res.json() ).then((data) => {
                 console.log(data);
                const temperature_temp = [];
        const voltage_temp = [];
        const latittude_temp = [];
        const longitude_temp = [];
        const time_temp = [];
        const location_temp = {}
        for(const element of data)
        {   console.log(element);
            temperature_temp.push(element.temperature);
            voltage_temp.push(element.voltage);
            latittude_temp.push(element.location.latitude);
            longitude_temp.push(element.location.longitude);
            time_temp.push(element.time);

        }
            location_temp.longitude=longitude_temp;
            location_temp.latitude=latittude_temp;
            console.log(location_temp)
            console.log(temperature_temp)
            this.setState({ time:time_temp,
            volt:voltage_temp,
            temp:temperature_temp,
            location:location_temp

            })
            
            // const data = response.json();
            // console.log(typeof(data));
            // console.log(data)
            
        
           
        });}
        
            
            
     
            
        
    

    // updatingstate = (value) =>{
    //     this.setState({ time:[...this.state.time,value.time],
    //                     temp:[...this.state.temp,value.temp],
    //                     latitude:[...this.state.location.latitude,value.location.latitude],
    //                     longitude:[...this.state.location.longitude,value.location.longitude],
    //                     volt:[...this.state.volt,value.volt],
    //     })
        


    
     componentDidMount(){
        this.getdata();
        

           this.interval = setInterval(this.getdata, 5000);
        }
        componentWillUnmount() {
            // Clear the interval right before component unmount
            clearInterval(this.interval);
        }
        


   
    onSubmitHandler = e =>
    {   

        this.getdata();

    }
    changeHandler = e =>
    {
        this.setState({truck_id:e.target.value})
    }
    render() {
        const {truck_id , temp,volt ,location,time} = this.state;
        console.log(this.state);
        return (
            <div>
                <label>truck_ID</label>
                <input type="text" name="truck_id" value = {truck_id} onChange ={this.changeHandler}></input>
                <button type = "submit" onClick = {this.onSubmitHandler}>submit</button>
                <div><h1>{truck_id}</h1></div>
                <div>{temp[0]}</div>
                <div>{volt[0]}</div>
                <div>{time[0]}</div>
                <div>{location.latitude[0]}</div>
                <div>{location.longitude[0]}</div>

                <Chart temperature={temp} time ={time} ></Chart>
                <VoltageGraph voltage={volt} time = {time}></VoltageGraph>
                {/* <Map latitude={location.latitude[0]} longitude={location.longitude[0]} ></Map> */}

        
            </div>
        )
    }
}
export default Calling;