import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Requestblood.css';
import Navbar from './Navbar';
import { useNavigate,Link } from 'react-router-dom';

function Requestblood() {
    const [values, setValues] = useState({
        name: '',
        age: '',
        group: '',
        gender: '',
        phone: '',
        address: '',
        unit: '',
    });

    const [submittedDetails, setSubmittedDetails] = useState(null); 
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch submitted details after component mounts
        fetchSubmittedDetails();
    }, []);
      

    const fetchSubmittedDetails = () => {
        // Assuming you have a way to get the patient ID after submission
        const patientId = localStorage.getItem('patientId'); 
        axios.get(`http://localhost:8080/patient/${patientId}`)
            .then((res) => {
                console.log(res);
                setSubmittedDetails(res.data);
            })
            .catch((err) => console.log(err));
    };


      const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/requestblood', values)
            .then((res) => {
                console.log(res);
                alert('Requested successfully');
                localStorage.setItem('patientId', res.data.insertId); // Store the patient ID for later retrieval
                setSubmittedDetails(values); // Set submitted details
                
            })
            .catch((err) => console.log(err));
    };


    const handleLogout = () => {
  
        setValues({
            name: '',
            age: '',
            group: '',
            gender: '',
            phone: '',
            address: '',
            unit: '',
        });

        setSubmittedDetails(null);
       
    };

    return (
        <>
            <Navbar />
            <div className='request-image'>
            <div className='request-blood-2'>
                <div className='requestform_blood'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='fname'>First Name</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='fname'
                            name='name'
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            placeholder='Your name..'
                        />

                        <label htmlFor='lname'>Age</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='age'
                            onChange={(e) => setValues({ ...values, age: e.target.value })}
                            placeholder='Your age...'
                        />

                        <label htmlFor='lname'>Blood group</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='group'
                            onChange={(e) => setValues({ ...values, group: e.target.value })}
                            placeholder='Your blood group...'
                        />

                        <label htmlFor='lname'>Gender</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='gender'
                            onChange={(e) => setValues({ ...values, gender: e.target.value })}
                            placeholder='Your gender...'
                        />

                        <label htmlFor='lname'>Phone</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='phone'
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                            placeholder='Your phone...'
                        />

                        <label htmlFor='lname'>Address</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='address'
                            onChange={(e) => setValues({ ...values, address: e.target.value })}
                            placeholder='Your address...'
                        />

                        <label htmlFor='lname'>Blood unit</label>
                        <input
                            className='Request_form'
                            type='text'
                            id='name'
                            name='unit'
                            onChange={(e) => setValues({ ...values, unit: e.target.value })}
                            placeholder='Enter blood unit...'
                        />

                        <button className='Request_button' type='submit'>
                            Submit
                        </button>
                      
                    </form>
                    <button className='no-button' onClick={handleLogout}><Link to='/home'>CLOSE</Link></button>
                </div>
                </div>

            {/* Display submitted details */}
            {submittedDetails && (
                <div className="submitted-details">
                    <h3>Submitted Details:</h3>
                    <ul>
                        <li>Name: {submittedDetails.patient_name}</li>
                        <li>Age: {submittedDetails.patient_age}</li>
                        <li>Blood Group: {submittedDetails.patient_group}</li>
                        <li>Gender: {submittedDetails.patient_gender}</li>
                        <li>Phone: {submittedDetails.patient_phone}</li>
                        <li>Address: {submittedDetails.patient_address}</li>
                        <li>Blood Unit: {submittedDetails.patient_unit}</li>
                        <li>Status: {submittedDetails.status}</li> {/* Display status */}
                    </ul>
                </div>
            )}



</div>
                

        </>
    );
}

export default Requestblood;







//completed

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../css/Requestblood.css';
// import Navbar from './Navbar';
// import {  useNavigate } from 'react-router-dom';

//  function Requestblood() {

//         const [values, setValues] = useState({
//           name: '',
//           age: '',
//           bloodgroup: '',
//           gender: '',
//           phone: '',
//           address:'',
//           unit: '',
        
        
//         });
// const Navigate=useNavigate();

//         const handleSubmit = (e) => {
//             e.preventDefault();
//             axios
//               .post('http://localhost:8080/requestblood', values)
//               .then((res) => {
//                 console.log(res);
//                 alert('requested successfully');
//             Navigate('/Home')
//               })
//               .catch((err) => console.log(err));
//           };

//     return (
//         <>
//         <Navbar/>
//         <div className='request-image'>
          
//         </div>
//         <div className='request-blood-2'>
//         <div className='requestform_blood'>
//      <form onSubmit={handleSubmit}>
//     <label for="fname">First Name</label>
//     <input className='Request_form' type="text" id="fname" name="name"  onChange={(e) => setValues({ ...values, name: e.target.value })}  placeholder="Your name.."/>

//     <label for="lname">Age</label>
//     <input  className='Request_form'  type="text" id="name" name="age"  onChange={(e) => setValues({ ...values, age: e.target.value })} placeholder="Your age..."/>

//     <label for="lname">Blood group</label>
//     <input  className='Request_form'  type="text" id="name" name="group"   onChange={(e) => setValues({ ...values, group: e.target.value })}  placeholder="Your age..."/>

//     <label for="lname">Gender</label>
//     <input  className='Request_form'  type="text" id="name" name="gender"  onChange={(e) => setValues({ ...values, gender: e.target.value })} placeholder=""/>

//     <label for="lname">phone</label>
//     <input  className='Request_form'  type="text" id="name" name="phone"  onChange={(e) => setValues({ ...values, phone: e.target.value })} placeholder="Your phone..."/>

//     <label for="lname">Adress</label>
//     <input  className='Request_form'  type="text" id="name" name="address"  onChange={(e) => setValues({ ...values, address: e.target.value })} placeholder="Your age..."/>

   

//     <label for="lname">Blood unit</label>
//     <input  className='Request_form'  type="text" id="name" name="unit"  onChange={(e) => setValues({ ...values, unit: e.target.value })} placeholder="enter blood unit...."/>

//     <button className='Request_button' type='submit'>submit</button>
//   </form>
// </div>
// </div>

//         </>
//     )
// }

// export default Requestblood;