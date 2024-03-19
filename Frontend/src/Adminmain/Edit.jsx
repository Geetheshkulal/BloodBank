import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from "react";
import  {Button} from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Edit.css'


function Edit() {

    // to show field values when we click update button
      const {id} = useParams();
      const navigate = useNavigate();

      useEffect(()=>{
        axios.get('http://localhost:8080/read/'+id)
        .then(res =>{
            console.log(res)
            setValues({...values, bloodbank_id: res.data[0].bloodbank_id, bloodgroup_id: res.data[0].bloodgroup_id, units: res.data[0].units, bloodgroup: res.data[0].bloodgroup})

        })
           .catch(err=> console.log(err))
    },[])


    const [values, setValues]=useState({
      bloodbank_id:'',
      bloodgroup_id:'',
      units:'',
      bloodgroup:'',

  })

  const handleUpdate = (event)=>{
    event.preventDefault();
    axios.put('http://localhost:8080/edit/'+id, values)
    .then(res=>{
        console.log(res)
        navigate('/admindashboard');
    }).catch(err=>console.log(err));
}


// for pop up window
   
    const handleClose=()=>{
      navigate('/admindashboard');
    }
 

    return (
    <>
     <h1>Edit user</h1>
  

    <form >
         <div class='mb-3 row'>
  
        <label class="col-sm-1">blood bank id</label>
        <div className="col-sm-5">
          <input type="text" name="bloodbank_id" className="form-control"  value={values.bloodbank_id}  onChange={e=>setValues({...values,bloodbank_id: e.target.value})}/>
        </div>
        </div>
     

        <div class='mb-3 row'>
        <label className="col-sm-1">blood group id</label>
        <div className="col-sm-5">
          <input type="text" name="bloodgroup_id" className="form-control"  value={values.bloodgroup_id}  onChange={e=>setValues({...values,bloodgroup_id: e.target.value})} />
        </div>
        </div>

        
        
        <div class='mb-3 row'>
        <label className="col-sm-1">units</label>
        <div className="col-sm-5">
          <input type="text" name="units" className="form-control"  value={values.units}  onChange={e=>setValues({...values,units: e.target.value})} />
        </div>
        </div>
 

         
        <div class='mb-3 row'>
        <label className="col-sm-1">Blood Group</label>
        <div className="col-sm-5">
          <input type="text" name="bloodgroup" className="form-control"  value={values.bloodgroup}   onChange={e=>setValues({...values,bloodgroup: e.target.value})}/>
        </div>
          </div>

       
  
      
        <div className="c-button">
        <Button variant="secondary"  className='Dsubmit'  onClick={handleClose}>Close </Button>
        <Button variant="primary" className='Dsubmit'   onClick={handleUpdate}>Update</Button>
        </div>
         
    </form>
 
    </>
    )
    }
      
export default Edit
