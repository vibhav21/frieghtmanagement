import React, { useState,useEffect,Component } from 'react'
import Navigation from './Navigation'
import {Link} from 'react-router-dom'
export default function Dashboard() {
    const[vehicleList, setVehicleList]= useState([])
    useEffect(()=>{
        fetch('/getVehicleInformation').then((res) => res.json()).then((vehicles) => setVehicleList([vehicles]))
    },[])
   
    return (
        <div>
            <Navigation />
            <div class="row container" style={{paddingLeft: 20,backgroundColor:"#ff9933",height: 50,marginTop: 20,marginLeft: 120, border: "2px solid black"}}><h2>Vehicle Details</h2></div>
            {vehicleList.map((vehicle)=>(
            <div class="row container" style={{marginLeft: 120, marginBottom: 5,marginTop: 0,padding: 20, paddingLeft: 40, border: "1px solid black"}}>
            {
                vehicle.map((i)=>(
                 <div class="card" key={i._id} style={{width:"22rem", marginLeft: 2}}>
                    <div class="card-body">
                    <h4 class="card-title">{i.vehicle_name}</h4>
                    <p class="card-text" ><b>Vehicle Power:</b>&nbsp;{i.vehicle_power}</p>
                    <p class="card-text" ><b>Vehicle Engine:</b>&nbsp;{i.vehicle_engine}</p>
                    <p class="card-text"><b>Vehicle Wheelbase:</b>&nbsp;{i.vehicle_wheelbase}</p>
                    <Link to={`/fetch/${i.id}`}>Track..</Link><br/>
                    </div>
                </div>
            ))}
             <div class="card" style={{width:"22rem"}}>
                    <div class="card-body">
                    <p class="card-text">&nbsp;<b>Add More...</b></p>
                    <Link to={`/add`}>Add</Link><br/>
                    </div>
                </div>
            </div>
            
        ))}
        </div>
    )
}
