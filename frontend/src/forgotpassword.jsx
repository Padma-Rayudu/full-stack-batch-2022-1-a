import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Forgotpassword()
{
     const formik = useFormik({
        initialValues: {
          email: '',
         
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .required('Email Required')
            .email("Must be Valid email")
            .max(225),
                }),
        onSubmit: submitdata,
      });
      function submitdata(values)
      {
          console.log(values)   


          fetch('http://localhost:5000/user/checkuser',{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            console.log(data)
            if(data.message==="success")
            { window.localStorage.setItem("resetpasswordemail",data.email) 
              window.location='./resetpassword'
            }
            else{
                alert(data.message)
            }
        })
      }

    return(<div>
        <div className='m-5 card p-5  mx-auto sh ' style={{ width: '600px' }}>
            <h3>Forgot Password</h3><br/>
            <form className="form" onSubmit={formik.handleSubmit}>
            <label className="form-label" htmlFor="fullname">
          Enter Registered Email
        </label>
            <input className="form-control" id="email" type='text'
               {...formik.getFieldProps('email')}
                ></input>
             {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
          <br/>
          <button className="btn btn-primary mt-3" type="submit">
          Continue
        </button>
          </form>
          </div>
    </div>)
}