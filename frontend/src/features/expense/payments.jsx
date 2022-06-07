import React from "react";
import {Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {getpayments} from "./expenseslice";
export default function Payments()
{

    const dispatch=useDispatch()
    const userpayments=useSelector(state=>state.expenseReducer.payments[0])
    console.log("payyy commm",userpayments)
    React.useEffect(()=>{
        dispatch(getpayments());
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
                         <th scope="col">InvestedBy</th>
                         <th scope="col">Event</th>
                         <th scope="col">Amount</th>
                         {/* <th scope="col">Date</th> */}
                     </tr>
                 </thead>
                 <tbody>
                 {
                    userpayments&&userpayments.map((p,i)=>{
                         return(
                              <tr>
                                  <th scope="col">{i+1}</th>
                                  <td>{p.fullname}</td>
                                  <td>{p.description}</td>
                                  <td>{p.divamount}</td>
                                  {/* <td>{ex.createdAt}</td> */}
                                  
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