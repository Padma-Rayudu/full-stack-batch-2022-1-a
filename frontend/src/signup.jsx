import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import {Link,useNavigate} from 'react-router-dom'

export default function Signup()
{    const [flag,setflag]=React.useState(0);
    const formik = useFormik({
        initialValues: {
          fullname: '',
          email: '',
          phone:'',
          password:'',
          confirmpassword: '',
          
        },
    
        validationSchema: Yup.object({
          fullname: Yup.string()
            .min(2, '*too short')
            .max(15, '*Must be 15 characters or less')
            .required('Fulltname Required'),
          confirmpassword: Yup.string()
            .required('confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            email: Yup.string()
            .email('Must be valid email')
            .required('Email Required'),
            phone:Yup.string()
            .phone("IN")
            .required(),
           password:Yup.string()
           .min(2,'*too short')
           .max(8,"*must be 8 characters")
           .required('*password required')
        }),
        onSubmit: submitdata,
      });
     function submitdata(values)
     {

            console.log(values)
            const {fullname,email,phone,password}=values;
            console.log(fullname,email,phone,password);
            fetch('http://localhost:5000/signup',{
                method:"POST",
                body:JSON.stringify({fullname,email,phone,password}),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res)=>res.json()).then((data)=>{
                if(data.message==="success")
                {
                    alert("User created successfully")
                    setflag(1)
                }
                else
                {
                    alert(data.err)
                }
            })

     }


    return(
        <div className="card m-5 p-5 mx-auto sh" style={{ width: '600px' }}>
        <h3>SignUp</h3><br/>
      <form className="form" onSubmit={formik.handleSubmit}>
        <label className="form-label" htmlFor="fullname">
          First Name
        </label>
        <input
          className="form-control"
          id="fullname"
          type="text"
          {...formik.getFieldProps('fullname')}
        />
        {formik.touched.fullname && formik.errors.fullname ? (
          <div style={{ color: 'red' }}>{formik.errors.fullname}</div>
        ) : null}
         <br/>
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="form-control"
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
         <br/>


         <label className="form-label" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="form-control"
          id="phone"
          type="tel"
          {...formik.getFieldProps('phone')}
        />
        {formik.touched.phone && formik.errors.phone? (
          <div style={{ color: 'red' }}>{formik.errors.phone}</div>
        ) : null}
         <br/>



       <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
        <br/>
         <label className="form-label" htmlFor="confirmpassword">
          ConfirmPassword
        </label>
        <input
          className="form-control"
          id="confirmpassword"
          type="password"
          {...formik.getFieldProps('confirmpassword')}
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div style={{ color: 'red' }}>{formik.errors.confirmpassword}</div>
        ) : null}

        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button><br/>
        <div className='d-flex'>
        <p>Already have account?</p>&nbsp;&nbsp;<Link to='/'>Login</Link>
        </div>
      </form>
    </div>
    )
}