import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link,useNavigate} from 'react-router-dom'
export default function Login()
{   const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password:'', 
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .required('*email Required')
            .email("Must be Valid email")
            .max(225),
        password:Yup.string()
           .required('*password required')
        }),
        onSubmit: submitdata,
      });
      function submitdata(values)
      {
         
         window.localStorage.setItem('otpemail',values.email)
         window.localStorage.setItem('otppassword',values.password)
        fetch('http://localhost:5000/login/login',{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            console.log(data)
             if(data.errors)
             {
                 alert("Invalid details")
             }
            else if(data.message==="success")
            {
              navigate('/otppage')
            }
            else
            {
              alert(data.message) 
            }
           
           
        })
      }
    
    return(
        <div>
        <div className='m-5 card p-5  mx-auto sh ' style={{ width: '600px' }}>
            <h3>LOGIN</h3><br/>
            <form className="form" onSubmit={formik.handleSubmit}>
            <input class="form-control" id="email" type='text'  placeholder='Email' 
               {...formik.getFieldProps('email')}
                ></input>
                 
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
          <br/>
            <input className="form-control" type='password' id="password" {...formik.getFieldProps('password')} placeholder='Password'></input>
        
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
        <Link to={'/forgotpassword'} style={{textDecoration:"none"}}>Forgot Password ?</Link>
         <br/>
         <br/>
            <button type='submit' className="btn btn-primary">Login</button><br/>
           <div className='d-flex mt-3'> <p>Don't have Account?</p>&nbsp;&nbsp;&nbsp;<Link to={'/signup'}>SignUp here!!</Link></div>
           </form>
       </div>
        </div>
    )
}