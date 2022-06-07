import React from "react";
import {Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getusers,addfriend, getfriends } from "./userSlice";

export default function Myfriends()
{   
    const dispatch=useDispatch()
    const friend=useSelector(state=>state.userReducer.friends[0])
    console.log("friendsdata",friend)
    React.useEffect(()=>{
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
        <div className=" mx-auto sh"> 
             <table className="table table-striped table-hover"style={{"width":"600px"}} >
                 <thead>
                     <tr>
                         <th scope="col">S.No</th>
                         <th scope="col">Name</th>
                         <th scope="col">Email</th>
                         <th scope="col">Owes you</th>
                     </tr>
                 </thead>
                 <tbody>
                 {
                     friend&&friend.map((fr,i)=>{
                         return(
                              <tr>
                                  <th scope="col">{i+1}</th>
                                  <td>{fr.fullname}</td>
                                  <td>{fr.email}</td>
                                  <td>-</td>
                                  
                              </tr>
                         )
                     })
                 }
                 </tbody>
                 </table>
                </div>
         </div>
     )
}