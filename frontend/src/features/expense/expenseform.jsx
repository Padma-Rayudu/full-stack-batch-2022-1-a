import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useSelector,useDispatch} from 'react-redux';
import { getfriends } from "../users/userSlice";
import {addexpense} from "../expense/expenseslice";
import{Link} from 'react-router-dom';
export default function Expenseform()
{   
  const dispatch=useDispatch()
  //var mem=[];
   var [members,setmembers]=React.useState([])
  const friend=useSelector(state=>state.userReducer.friends[0])
  console.log("friendsdata",friend)
    const formik = useFormik({
        initialValues: {
          tittle: '',
          amount:null,
          
        },
        validationSchema: Yup.object({
          tittle: Yup.string()
            .required('Tittle Required')
            .max(225),
        amount:Yup.number()
           .required("Amount Required")
           .positive("positive integer"),
        // members:Yup.array().min(1).of(Yup.string().required()).required(),
           
        }),
        onSubmit: submitdata,
      });
      function submitdata(values)
      {
              values={...values,members:members}
              dispatch(addexpense(values))
      }
      function handlecheckbox(e)
      {        
              if(e.target.checked)
              {   
                 members.push(e.target.value)
                 console.log("mem",members)
                 setmembers([...members])
              }
              else
              {
               var index=members.indexOf(e.target.value)
               members.splice(index,1)  
               console.log("mem",members)   
               setmembers([...members])
              }
      }
React.useEffect(()=>{
  dispatch(getfriends());
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
            <div className='m-5 card p-3  mx-auto sh ' style={{ width: '600px' }}>
            <h3>Expense</h3><br/>
            <form className="form" onSubmit={formik.handleSubmit}>
            <label className="form-label" htmlFor="fullname">
               Expense Tittle
              </label>
            <input className="form-control" id="title" type='text'
               {...formik.getFieldProps('tittle')}
                ></input>
             {formik.touched.tittle&& formik.errors.tittle ? (
          <div style={{ color: 'red' }}>{formik.errors.tittle}</div>
        ) : null}
          <br/>

          <label className="form-label" htmlFor="fullname">
               Amount
              </label>
            <input className="form-control" id="amount" type='number'
               {...formik.getFieldProps('amount')}
                ></input>
             {formik.touched.amount&& formik.errors.amount? (
          <div style={{ color: 'red' }}>{formik.errors.amount}</div>
        ) : null}
          <br/>
          <label className="form-label" htmlFor="fullname">
               select Your friends
              </label>
              <div className='d-flex'>
              {  friend&&friend.map((fr)=>{
                  return(
                    <div className=' m-2'>
                    <input className="form-check-input" onChange={handlecheckbox} type="checkbox" name={fr.fullname} value={fr.id}/>&nbsp;&nbsp;
                    <label>{fr.fullname}</label>
                    </div>
                  ) 
              })}
              </div>

          <button className="btn btn-primary mt-3" type="submit">
          Add Expense
        </button>
          </form>
          </div> 
        </div>
    )
}