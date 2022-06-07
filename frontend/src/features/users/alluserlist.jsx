
import React from "react";
import {Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getusers,addfriend, getfriends } from "./userSlice";
export default function Allusers()
{

    const dispatch=useDispatch()
    const [femail,setfemail]=React.useState('');
    const friend=useSelector(state=>state.userReducer.friends[0])
    console.log("friendsdata",friend)
    React.useEffect(()=>{
        console.log("useeffetct called")
        dispatch(getfriends())   
     },[])
    
    return(
        <div>
             <div>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to="/myfriends">ListFriend</Link></li>
                <li><Link to='/addfriend'>Add Friend</Link></li>
                <li><Link to='/addexpense'>Add Expense</Link></li>
                <li><Link to='/myexpenses'>MyExpenses</Link></li>
                <li><Link to='/mypayments'>You Owe</Link></li>
                <li  style={{float:"right"}}><Link to='/logout' onClick={()=>{
                  localStorage.removeItem('token')
                }} style={{color:"white"}}>Logout</Link></li>
            </ul>
        </div>
        <div className="d-flex m-2" style={{"width":"500px"}}>
            <input type="text"  className="form-control" placeholder="Enter email id"></input><button  className="btn btn-success" onClick={()=>{}}>Add</button>
        </div>
            <div>
               
            {
                friend&&friend.map((user)=>{
                   
                    return(
                       <div>  <b>{user.fullname}</b></div>
                            
                    )
                })
            }
            </div>
        </div>
    )
}