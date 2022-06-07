
import {createSlice}  from '@reduxjs/toolkit';
export const userSlice=createSlice({
  name:"users",
  initialState:{
    users:[],
    friends:[]
  },
  reducers:{
    loadusers:(state,action)=>{
      state.users=[];
      state.users.push(action.payload)
    },
    loadfriends:(state,action)=>{
      state.friends=[];
      state.friends.push([...action.payload])
    }
  }
})
 export function getusers()
  { console.log("getusers called")
  return(dispatch)=>{
    fetch("http://localhost:5000/user/userdata")
    .then((res)=>res.json())
    .then((data)=>{
      
       dispatch(loadusers(data.userdata))
    })
  }
 }
 export function getfriends()
 {
      var id=window.localStorage.getItem("userid");
      return(dispatch)=>{
        fetch("http://localhost:5000/friend/frienddata/"+id,{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
        })
        .then((res)=>res.json())
        .then((data)=>{
          dispatch(loadfriends(data[0]))
        })
      }  
 }
 export function addfriend(friendid)
 {
     var useremail=window.localStorage.getItem("loginuser");
       var obj={
       useremail,
       friendid:friendid
     }
     return(dispatch)=>
     {
      fetch('http://localhost:5000/friend/addfrienddata', {
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
          alert("friend added successfully")
         // dispatch(getfriends())
     }})
    }
 }

export const { loadusers,loadfriends}=userSlice.actions
export default userSlice.reducer