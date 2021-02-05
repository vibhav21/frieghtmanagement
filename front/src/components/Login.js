import React, { useState, useEffect } from 'react'
import App from '../App'
//import Dashboard from './Dashboard'
import Calling from './Calling'
import ReadTruck from './ReadTruck'
import './Login.css'

export default function Login() {
const [userList, setUserList] = useState([])
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [showDashboard, setShowDashboard] = useState(false)

useEffect(() => {
    fetch('/user').then((res) => res.json()).then((users) => setUserList([users]))
    }, [])

function submitHandler(e) {
    e.preventDefault()
    console.log(userList)
    
    if (userList[0][0].email == email && userList[0][0].password == password)
        {
        setShowDashboard(true)
        }
    
    }

function emailChangeHandler(e) {
    setEmail(e.target.value)
    }
function passwordChangeHandler(e) {
    setPassword(e.target.value)
    }

return (
<div>
    {showDashboard ? (<Calling/>) :
    (<div class="rowbackgroundIMG" style={{ border: "0px solid black", borderRadius: 0, paddingTop: 20, marginTop: 0, marginLeft: 0, paddingLeft: 200,paddingTop:250 }}>
    <form onSubmit={submitHandler}>
    <tr><h2 style={{color: "white", marginRight:200}}>Login</h2></tr>
    <tr><td><input type="email" style={{ marginTop: 20, fontSize: 25 }} placeholder="Enter Email..." name="email" onChange={emailChangeHandler} /></td></tr>
    <tr><td><input type="password" style={{ marginTop: 10, fontSize: 25 }} placeholder="Enter Password..." name="password" onChange={passwordChangeHandler} /></td></tr>
    <tr ><button style={{ marginTop: 20, fontSize: 12 }} type="submit" class="btn btn-success">LOGIN</button></tr>
    </form>
    </div>)}

    </div>
)
}