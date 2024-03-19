import React, { useState } from 'react';
import axios from 'axios';
import '../css/Requestblood.css';
import Navbar from './Navbar';
import {  useNavigate } from 'react-router-dom';

 function Requestblood() {

        const [values, setValues] = useState({
          name: '',
          age: '',
          bloodgroup: '',
          gender: '',
          phone: '',
          address:'',
          unit: '',
        
        
        });
const Navigate=useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
            axios
              .post('http://localhost:8080/requestblood', values)
              .then((res) => {
                console.log(res);
                alert('requested successfully');
            Navigate('/Home')
              })
              .catch((err) => console.log(err));
          };

    return (
        <>
        <Navbar/>
        <div className='request-image'>
          
        </div>
        <div className='request-blood-2'>
        <div className='requestform_blood'>
     <form onSubmit={handleSubmit}>
    <label for="fname">First Name</label>
    <input className='Request_form' type="text" id="fname" name="name"  onChange={(e) => setValues({ ...values, name: e.target.value })}  placeholder="Your name.."/>

    <label for="lname">Age</label>
    <input  className='Request_form'  type="text" id="name" name="age"  onChange={(e) => setValues({ ...values, age: e.target.value })} placeholder="Your age..."/>

    <label for="lname">Blood group</label>
    <input  className='Request_form'  type="text" id="name" name="group"   onChange={(e) => setValues({ ...values, group: e.target.value })}  placeholder="Your age..."/>

    <label for="lname">Gender</label>
    <input  className='Request_form'  type="text" id="name" name="gender"  onChange={(e) => setValues({ ...values, gender: e.target.value })} placeholder=""/>

    <label for="lname">phone</label>
    <input  className='Request_form'  type="text" id="name" name="phone"  onChange={(e) => setValues({ ...values, phone: e.target.value })} placeholder="Your phone..."/>

    <label for="lname">Adress</label>
    <input  className='Request_form'  type="text" id="name" name="address"  onChange={(e) => setValues({ ...values, address: e.target.value })} placeholder="Your age..."/>

   

    <label for="lname">Blood unit</label>
    <input  className='Request_form'  type="text" id="name" name="unit"  onChange={(e) => setValues({ ...values, unit: e.target.value })} placeholder="enter blood unit...."/>

    <button className='Request_button' type='submit'>submit</button>
  </form>
</div>
</div>

        </>
    )
}

export default Requestblood;