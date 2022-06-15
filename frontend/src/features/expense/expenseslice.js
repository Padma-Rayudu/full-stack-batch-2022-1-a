import {createSlice}  from '@reduxjs/toolkit';
export const expenseSlice=createSlice({
  name:"expenses",
  initialState:{
    expenses:[],
    payments:[],
    single:[]
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
    },
    loadsingle:(state,action)=>{
      state.single=[];
      state.single.push(action.payload)
      console.log("singleexpense",state.single)
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

export function singleexpense(id)
{
  return(dispatch)=>{
    fetch("http://localhost:5000/expense/singleexpense/"+id,
    {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }}
    )
    .then((res)=>res.json())
    .then((data)=>{
       console.log("singleexpensee..",data[0])
      dispatch(loadsingle(data[0]))
    })
  }
}

export function settlements(exid)
{
    console.log("settelment caleddd")
  return(dispatch)=>{
    var userid=window.localStorage.getItem("userid");
    var obj={
    userid:userid,
    exid:exid
  }
   fetch('http://localhost:5000/expense/settleexpense', {
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
       alert("Amount settled successfully")
       dispatch(getpayments())
  }})
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
    }
    else if(data.errors)
    {
      alert("Enter Proper details")
    }
  })
   }

    }
 

export const { loadexpenses,loadpayments,loadsingle}=expenseSlice.actions
export default expenseSlice.reducer
