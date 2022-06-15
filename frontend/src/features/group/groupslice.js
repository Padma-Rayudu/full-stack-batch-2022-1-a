import {createSlice}  from '@reduxjs/toolkit';
export const groupSlice=createSlice({
  name:"groups",
  initialState:{
    groupsdata:[],
    groupids:[],

  },
  reducers:{
    loadgroupsdata:(state,action)=>{
      state.groupsdata=[];
      state.groupsdata.push(action.payload)
      console.log("state users",state.groupsdata)
    },
    loadgroupids:(state,action)=>{
      state.groupids=[];
      state.groupids.push(action.payload)
      console.log("state grouids",state.groupids)
    },
   
  }
})
export function addgroup(obj)
{
    var userid=window.localStorage.getItem("userid");
    obj={...obj,createdby:userid}
    console.log("objjj",obj)
     return(dispatch)=>
     {
      fetch('http://localhost:5000/group/addgroupdata', {
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
          alert("group added successfully")
         
     }
     else if(data.errors)
     {
      alert("Enter valied Information")
     }
  })
  }    
}
export function getgroups()
{         console.log("get groups calleddd")
    var userid=window.localStorage.getItem("userid");
     return(dispatch)=>
     {
      fetch('http://localhost:5000/group/getgroups/'+userid, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    })
    .then((result)=>result.json()).then((data)=>{
        dispatch(loadgroupsdata(data[0]))
        var groupdetails=[]
        for(var i=0;i<data[1].length;i++)
        {
              groupdetails.push({groupid:data[1][i],groupname:data[2][i]})
        }
         dispatch(loadgroupids(groupdetails))
  })
  }    
}
export const { loadgroupsdata,loadgroupids}=groupSlice.actions
export default groupSlice.reducer