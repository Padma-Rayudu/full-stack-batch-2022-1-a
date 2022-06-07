
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Resetpassword()
{
    const formik = useFormik({
        initialValues: {
          password:'',
          confirmpassword: '', 
        },
    
        validationSchema: Yup.object({
         
          confirmpassword: Yup.string()
            .required('confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
           password:Yup.string()
           .min(2,'*too short')
           .max(8,"*must be 8 characters")
           .required('*password required')
        }),
        onSubmit: submitdata,
      });
      function submitdata(values)
      {      var email=window.localStorage.getItem("resetpasswordemail")
            var obj={
              email:email,
              password:values.password
              }
               console.log("data",obj)
              fetch("http://localhost:5000/user/resetpassword",{
                method:"POST",
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json'
                }
              }).then(res=>res.json()).then(data=>{
                  console.log(data)
                  if(data.message=="success")
                  {
                       alert("Reset Password successfull")
                       window.location='/'
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
            <h3>Reset Password</h3><br/>
            <form className="form" onSubmit={formik.handleSubmit}>
            <label className="form-label" htmlFor="new password">
          Enter New password
              </label>
            <input className="form-control" id="password" type='password'
               {...formik.getFieldProps('password')}
                ></input>
             {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
          <br/>

          <label className="form-label" htmlFor="confirm password">
          Confirm password
        </label>
        
            <input className="form-control" id="confirmpassword" type='password'
               {...formik.getFieldProps('confirmpassword')}
                ></input>
             {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div style={{ color: 'red' }}>{formik.errors.confirmpassword}</div>
        ) : null}
          <br/>
          <button className="btn btn-primary mt-3" type="submit">
          Reset
        </button>
          </form>
          </div>
        </div>
    )
}