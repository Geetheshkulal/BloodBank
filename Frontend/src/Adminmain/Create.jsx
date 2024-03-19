import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {Button,Modal } from "react-bootstrap";
import '../css/Create.css';

function Create() {
  const [values, setValues] = useState({
    name: '',
    age: '',
    bloodgroup: '',
    gender: '',
    phone: '',
    address: '',
    unit: '',

  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/adminCreate', values)
      .then((res) => {
        console.log(res);
        navigate('/AdminDashboard')
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="background">
      <div className='create-box'>
      <div className="container_box">

      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className="col-sm-2">patient Name</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='fname'
                            name='name'
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            placeholder='Your name..'
                        />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2">patient age</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='age'
                            onChange={(e) => setValues({ ...values, age: e.target.value })}
                            placeholder='Your age...'
                        />

          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2">Blood group</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='group'
                            onChange={(e) => setValues({ ...values, group: e.target.value })}
                            placeholder='Your blood group...'
                        />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2">Gender</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='gender'
                            onChange={(e) => setValues({ ...values, gender: e.target.value })}
                            placeholder='Your gender...'
                        />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2">phone</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='phone'
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                            placeholder='Your phone...'
                        />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2">address</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='address'
                            onChange={(e) => setValues({ ...values, address: e.target.value })}
                            placeholder='Your address...'
                        />

          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-2">blood unit</label>
          <div className="col-sm-10">
          <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='unit'
                            onChange={(e) => setValues({ ...values, unit: e.target.value })}
                            placeholder='Enter blood unit...'
                        />
          </div>
        </div>
            <div >
                <button className='Dsubmit' type="submit">Add User</button>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Create;
