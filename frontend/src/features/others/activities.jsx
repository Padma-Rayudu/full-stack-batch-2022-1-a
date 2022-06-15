
import React from "react";
import {Link,useNavigate } from 'react-router-dom';
import { getactivities } from "../users/userSlice";
import {useSelector,useDispatch} from 'react-redux';
export function Activities()
{   const dispatch=useDispatch();
    const activities=useSelector(state=>state.userReducer.activities[0])
    console.log("activitydataaaa",activities)
    
    React.useEffect(()=>{
    dispatch(getactivities());
  },[]) 
    return(
        <div>
            <div>
      <ul>
        <li><Link to='/home'><i class="bi bi-house-door-fill"></i>&nbsp;&nbsp;Home</Link></li>
        <li style={{ float: "right" }}><Link to='/logout' onClick={() => {
          localStorage.removeItem('token')
        }} style={{ color: "white" }}><i class="bi bi-box-arrow-left"></i>&nbsp;Logout</Link></li>
        <li style={{ float: "right" }}><a style={{ color: "white" }}><i class="bi bi-person-circle"></i>&nbsp;{localStorage.getItem('username')}</a></li>

      </ul>

    </div>
    <div className="d-flex">
    <div className="card ms-3 mt-3" style={{width:"200px",height:"500px"}}>
    
    <nav class="nav flex-column">
       <Link to="/myfriends" className="nav-link" style={{textDecoration:"none"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-hearts" viewBox="0 0 16 16">
         <path fill-rule="evenodd" d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566ZM9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z" />
       </svg>&nbsp;&nbsp;Friends</Link>
       <Link to='/myexpenses' className="nav-link active"  style={{textDecoration:"none"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
         <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
         <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
         <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
         <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
       </svg>&nbsp;&nbsp;Expenses</Link>
       <Link to='/mypayments' className="nav-link active" style={{textDecoration:"none"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-back" viewBox="0 0 16 16">
         <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
         <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
       </svg>&nbsp;My Debts</Link>
       <Link to='/allgroups' className="nav-link active"  style={{textDecoration:"none"}}> <i class="bi bi-people-fill"></i>&nbsp;Group</Link>
       <Link to='/showactivities' className="nav-link active" style={{textDecoration:"none"}}><i class="bi bi-clipboard-check"></i>&nbsp;Activities</Link>
  </nav>
  </div>   
        <div className="mx-auto mt-3">
   
        <table className="table table-striped table-hover"style={{"width":"900px"}} >
                 <thead>
                     <tr>
                         <th scope="col">S.No</th>
                         <th scope="col">Acitivity</th>
                         <th scope="col">Time</th>
                        
                     </tr>
                 </thead>
                 <tbody>
                 {
                     activities&&activities.map((act,i)=>{
                         
                                return(
                                    <tr>
                                        <th scope="col">{i+1}</th>
                                        <td>{act.activityname}</td>
                                        <td>{act.time}</td>
                                     
                                        
                                    </tr>)
                           
                           

                         })
                         
                             }
                 </tbody>
                 </table>
        </div>
        </div>
        </div>
    )
}