
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'
 import expenseReducer from '../features/expense/expenseslice';
 import groupReducer from '../features/group/groupslice';
 const store =configureStore({
   reducer:
  {userReducer,expenseReducer,groupReducer}
})
 export default store;