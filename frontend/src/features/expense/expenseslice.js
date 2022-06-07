import {createSlice}  from '@reduxjs/toolkit';
export const expenseSlice=createSlice({
  name:"expenses",
  initialState:{
    expenses:[],
    payments:[]
  },
  reducers:{
    loadexpenses:(state,action)=>{
      state.expenses=[];
      state.expenses.push(action.payload)
      console.log("state users",state.expenses)
    },
    loadpayments:(state,action)=>{
      state.payments=[];
      state.payments.push(action.payload)
      console.log("paymendata",state.payments)
    }
  }
})
 export function getexpenses()
  { console.log("getexpenses called")
  return(dispatch)=>{
    var id=window.localStorage.getItem("userid")
    fetch("http://localhost:5000/expense/expensedata/"+id,
    {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }}
    )
    .then((res)=>res.json())
    .then((data)=>{
       console.log(data)
      dispatch(loadexpenses(data[0]))
    })
  }
 }

 export function getpayments()
  { console.log("payments called")
  return(dispatch)=>{
    var id=window.localStorage.getItem("userid")
    fetch("http://localhost:5000/expense/paymentdata/"+id,
    {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }}
    )
    .then((res)=>res.json())
    .then((data)=>{
       console.log(data)
      dispatch(loadpayments(data[0]))
    })
  }
 }




 export function addexpense(values)
 {
    return(dispatch)=>{
      var userid=window.localStorage.getItem("userid");
      var obj={
      ...values,createdby:userid,
    }
     fetch('http://localhost:5000/expense/addexpense', {
       method: "POST",
       body: JSON.stringify(obj),
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem("token")}`,
       }
   })
   .then((result)=>result.json()).then((data)=>{
   if(data.message==="success")
   {
         alert("Expense added successfully")
         dispatch(getexpenses())
    }})
   }

    }
 

export const { loadexpenses,loadpayments}=expenseSlice.actions
export default expenseSlice.reducer
