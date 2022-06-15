import './App.css';
import React from 'react'
import Login from './login';
import Signup from './signup';
import Forgotpassword from './forgotpassword';
import Resetpassword from './resetpasswordform'
import Myfriends from './features/users/myfriends';
import Myexpenses from './features/users/myexpenses';
import Home from './homepage';
import Payments from './features/expense/payments';
import ExpenseForm from './features/expense/expenseform';
import Showdetails from './features/expense/showdetails';
import Group from './features/group/group';
import Allgroups from './features/group/allgroups';
import Choice from './features/others/choice';
import  Otppage  from './otppage';
import { Activities } from './features/others/activities';
import Groupexpenseform from './features/group/groupexpenseform';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
           <Route path='/signup'element={<Signup/>}></Route>
           <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
           <Route path='/resetpassword' element={<Resetpassword/>}></Route>
           <Route path='/home'element={<Home/>}></Route>
           <Route path='/addexpense' element={<Choice/>}></Route>
           <Route path='/myfriends' element={<Myfriends/>}></Route>
           <Route path='/logout' element={<Login/>}></Route>
           <Route path='/myexpenses'element={<Myexpenses/>}></Route>
           <Route path='/mypayments' element={<Payments/>}></Route>
           <Route path='/showdetails/:id' element={<Showdetails/>}></Route>
           <Route path='/allgroups' element={<Allgroups/>}></Route>
           <Route path='/addgroup' element={<Group/>}></Route>
           <Route path='/friendexpenseform'element={<ExpenseForm/>}></Route>
           <Route path='/groupexpenseform'element={<Groupexpenseform/>}></Route>
           <Route path='/showactivities' element={<Activities/>}></Route>
           <Route path='/otppage' element={<Otppage/>}></Route>
           <Route path='/' element={<Login/>}></Route>
       </Routes>
       </BrowserRouter>
  
  );
}

export default App;
