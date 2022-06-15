
import {createSlice}  from '@reduxjs/toolkit';
export const userSlice=createSlice({
  name:"users",
  initialState:{
    users:[],
    friends:[],
    activities:[],
  },
  reducers:{
    loadusers:(state,action)=>{
      state.users=[];
      state.users.push(action.payload)
    },
    loadfriends:(state,action)=>{
      state.friends=[];
      state.friends.push([...action.payload])
    },
    loadactivities:(state,action)=>{
      state.activities=[];
      state.activities.push([...action.payload])
    }
  }
})
 export function getusers()
  { console.log("getusers called")
  return(dispatch)=>{
    fetch("http://localhost:5000/user/userdata",
    {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
    })
    .then((res)=>res.json())
    .then((data)=>{
      
       dispatch(loadusers(data.userdata))
    })
  }
 }
 export function getactivities()
 {
   console.log("hii im calleddd")
  var id=window.localStorage.getItem("userid");
  return(dispatch)=>{
    fetch("http://localhost:5000/user/useractivities/"+id,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log("activitydata",data[0])
      dispatch(loadactivities(data[0]))
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
          var newdata=[];
          data[0].map((fr)=>{
              var flag=0;
              var obj=fr;
              data[1].map((frr)=>{
                  if(obj.email===frr.email)
                  {
                    newdata.push({...frr,id:obj.id})
                    flag=1;
                  }
              })
              if(flag==0)
              {
                newdata.push({...fr,sum:0})
              }
          })
          dispatch(loadfriends(newdata))
        })
      }  
 }
 export function addfriend(friendemail)
 {
     var useremail=window.localStorage.getItem("loginuser");
       var obj={
       useremail,
       friendemail:friendemail
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
          dispatch(getfriends())
     }
     else if(data.errors)
     {
      alert("Enter proper data")
     }
    else
  {
    alert("user not registred yet")
  }})
    }
 }

export const { loadusers,loadfriends,loadactivities}=userSlice.actions
export default userSlice.reducer