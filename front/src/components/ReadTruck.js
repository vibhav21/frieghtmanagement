import React,{useState,useEffect} from 'react'
import { Table } from 'react-bootstrap'
//import Navigation from './Navigation'
import {Link} from 'react-router-dom'
export default function ReadTruck() {
    const[usersList, setUserList]=useState([])
    const[url,setUrlProp]=useState(false)
    useEffect(()=>{
        fetch('/user').then((res) => res.json()).then((users) => setUserList([users]))
    },[url])
 usersList.map((item)=> {
     item.map((i)=> console.log(i._id))
 })
 function updateHandler(e){
     console.log(e)
 }
 function deleteUser(id){
    fetch('/deleteUser/'+id).then((res) => res.json()).then((ack) =>  setUrlProp(!url))  
 }
    return (
        <div>
                  {/* <Navigation /> */}
                  <Table bordered>
                        <tr>
                            {/* <th>Contact Name</th>
                            <th>Phone Number</th> */}
                            <th>Email ID</th>
                            <th>Password</th>
                            {/* <th> Update</th>
                            <th> Delete</th> */}
                        </tr>
           {usersList.map((item)=>(
            
                    item.map((i)=>(
                    <tr key={i._id}>
                            {/* <td>{i.username}</td>
                            <td>{i.phoneNumber}</td> */}
                            <td>{i.email}</td>
                            <td>{i.password}</td>
                            <td><Link class="btn btn-primary" to={`/Calling/${i._id}`} >Update</Link></td>
                            <td><button onClick={() => deleteUser(i._id)} className="btn btn-danger">Delete</button></td>
                        </tr> 
                    ))
                    
                ))}
                
                </Table>
        </div>
    )
}