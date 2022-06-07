import React from "react";
import {Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getusers,addfriend, getfriends } from "./features/users/userSlice";
export default function Home()
{   const dispatch=useDispatch()
    const users=useSelector(state=>state.userReducer.users[0])
   console.log("usersss",users)
    React.useEffect(()=>{
        console.log("useeffetct called")
        dispatch(getusers())   
     },[])
    
    return(<div>
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
        <div style={{"marginLeft":"500px","marginTop":"20px"}}>
        <h3>
          Welcome to SplitWise Application
        </h3>
        </div>
        
          
    </div>)
}