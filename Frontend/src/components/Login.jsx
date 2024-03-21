import React, { useState } from 'react';
import css from '../css/Signup.css';
import Loginvalidation from './Loginvalidation';
import Signupvalidation from './Signupvalidation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//r
function Login(){
  const [values,setValues]=useState({
    user_email:'',
  user_password:''
  })
  const navigate=useNavigate() 
  const [errors,setErrors]=useState({})
const handleInput=(event)=>{
  setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
}

//login function

const handleSubmit=(event)=>{
  event.preventDefault();
  setErrors(Loginvalidation(values));
  if(errors.user_email==="" && errors.user_password===""){

  axios.post('http://localhost:8080/Login',values)
.then(res=>{
  if(res.data==='success'){
    alert("login success")
    navigate('/Home');
  }
else{
alert("not exists");
}

})
.catch(err=>console.log(err)); 
}
}
//css function
  const [loginVisible, setLoginVisible] = useState(true);

  const toggleForm = () => {
    setLoginVisible(!loginVisible);
  };

  const [loginFormLeft, setLoginFormLeft] = useState('50px');
  const [registerFormLeft, setRegisterFormLeft] = useState('-400px');
  const [btnLeft, setBtnLeft] = useState('0px');

  const register = () => {
    setLoginFormLeft('-400px');
    setRegisterFormLeft('50px');
    setBtnLeft('110px');
  };

  const login = () => {
    setLoginFormLeft('50px');
    setRegisterFormLeft('450px');
    setBtnLeft('0px');
  };

      return (
        <div className="hero">
          <div className="log">
            <div className="button_signup">
              <div className="btn" style={{ left: btnLeft }}></div>
              <button type="button" className="toggle-btn" onClick={login}>
                login
              </button>
              <button type="button" className="toggle-btn" onClick={register}>
                <Link to ='/'>Signup</Link>
              </button>
            </div>
       
            <form id="login"  className="grow" style={{ left: loginFormLeft }} onSubmit={handleSubmit}>
                <input type="email" className="input-f1" placeholder="user email" name="user_email" onChange={handleInput} required/>
                {errors.user_email && <span>{errors.user_email}</span>}
                <input type="password" className="input-f1" placeholder="password" name="user_password" onChange={handleInput} required/>
                {errors.user_password &&<span>{errors.user_password}</span>}
                <input type="checkbox" className="check"/><span>Remember Password</span>
                <button type="submit" className="submit-btn" >Log in</button>
            </form>
    
            <form id="register" className="grow" style={{ left: registerFormLeft }} onSubmit={handleSubmit}>
                <input type="text" className="input-f" placeholder="user name" name="user_name" onChange={handleInput} required/>
                {errors.user_name && <span>{errors.user_name}</span>}
                <input type="email" className="input-f" placeholder="Email Id" name="user_email" onChange={handleInput} required/>
                {errors.user_email && <span>{errors.user_email}</span>}
                <input type="password" className="input-f" placeholder="password"name='user_password' onChange={handleInput} required/>
                {errors.user_password && <span>{errors.user_password}</span>}
                <div className="check"></div><span></span>
                <button type="submit" className="submit-btn">Register</button>
            </form>
          </div>
        </div>



      );
    };
    
    

export default Login;
