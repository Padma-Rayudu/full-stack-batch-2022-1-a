import './App.css';
import React from 'react'
import Login from './login';
import Signup from './signup';
import Forgotpassword from './forgotpassword';
import Resetpassword from './resetpasswordform'
import Allusers from './features/users/alluserlist'
import Myfriends from './features/users/myfriends';
import Myexpenses from './features/users/myexpenses';
import Home from './homepage';
import Payments from './features/expense/payments';
import ExpenseForm from './features/expense/expenseform';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
           <Route path='/signup'element={<Signup/>}></Route>
           <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
           <Route path='/resetpassword' element={<Resetpassword/>}></Route>
           <Route path='/home'element={<Home/>}></Route>
           <Route path='/addfriend' element={<Allusers/>}></Route>
           <Route path='/addexpense' element={<ExpenseForm/>}></Route>
           <Route path='/myfriends' element={<Myfriends/>}></Route>
           <Route path='/logout' element={<Login/>}></Route>
           <Route path='/myexpenses'element={<Myexpenses/>}></Route>
           <Route path='/mypayments' element={<Payments/>}></Route>
           <Route path='/' element={<Login/>}></Route>
       </Routes>
       </BrowserRouter>
  
  );
}

export default App;
