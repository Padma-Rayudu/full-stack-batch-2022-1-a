
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'
 import expenseReducer from '../features/expense/expenseslice';
 const store =configureStore({
   reducer:
  {userReducer,expenseReducer}
})
 export default store;