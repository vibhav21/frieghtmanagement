import React, { Component } from 'react'
import axios from 'axios'
 class Addtruck extends Component {
    constructor(props){
        super(props)
        this.state = {
            truckId: '',
            License_plate: '',
            starting_point: '',
            destination: ''
        }
    }
    changeHandler = e=>{
        this.setState({[e.target.name]:e.target.value})
    }
    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        
        fetch('/addtruck',requestOptions).then((res) => res.json()).then((users) => console.log(users))
        
    }

    render() {
        const {truckId , License_plate,starting_point ,destination} = this.state
        return (
            <div>
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <label>Truck ID</label>
                        <input type = "text" name = "truckId" value = {truckId} onChange = {this.changeHandler}></input>

                    </div>
                    <div>
                        <label>License Plate</label>
                        <input type="text" name="License_plate" value = {License_plate} onChange = {this.changeHandler}></input>
                    </div>
                    
                    <div>
                        <label>Starting Point</label>
                        <input type="text" name="starting_point" value = {starting_point} onChange = {this.changeHandler}></input>
                    </div>
                    
                    <div>
                        <label>Destination</label>
                        <input type="text" name="destination" value = {destination} onChange = {this.changeHandler}></input>
                    </div>
                    <button type = "submit">Submit</button> 
                </form>
                
            </div>
        )
    }
}

export default Addtruck
