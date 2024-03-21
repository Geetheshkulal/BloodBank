import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Table } from 'reactstrap';
import '../css/AdminDashboard.css';

function AdminDashboard() {
    const location = useLocation();
    const [adminData, setAdminData] = useState(null);
    const [bloodBankData, setBloodBankData] = useState(null);
    const [requests, setRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [hasData, setHasData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/requestblood');
                console.log(response.data);
                setRequests(response.data);

                const hasResponse = await axios.get('http://localhost:8080/has');
                setHasData(hasResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

        if (location.state && location.state.adminData && location.state.bloodBankData) {
            setAdminData(location.state.adminData);
            setBloodBankData(location.state.bloodBankData);
        }
    }, [location.state]);

// approve

    const handleApprove = (id) => {
      axios.put(`http://localhost:8080/approve/${id}`)
          .then((res) => {
              console.log(res);
              // Update the status locally after approval
              const updatedRequests = requests.map(request => {
                  if (request.patient_id === id) {
                      return { ...request, status: 'approved' };
                  } else {
                      return request;
                  }
              });
              setRequests(updatedRequests);
  
              // Update approvedRequests state
              setApprovedRequests([...approvedRequests, id]);
          })
          .catch((err) => console.log(err));
  };
  
  const handleDelete = (id)=>{
            axios.delete('http://localhost:8080/delete/'+id)
            .then(res =>{
                // location.reload();
            })
            .catch(err=> console.log(err));
         }



    return (
        < div className='page'>
            <div className="container">
                <Sidebar />
                {adminData && bloodBankData && (
                    <div>
                        <h2 className='admin-header'>Welcome, {adminData.admin_email}</h2>
                        <p>Blood Bank Details:</p>
                        <p>ID: {bloodBankData.bloodbank_id}</p>
                        <p>Blood Bank Name: {bloodBankData.bloodbank_name}</p>
                    </div>
                )}
            </div>

            <div className="user-list-container">
                <div className="user-list">
                    <h2 className="request_header">Patient Table</h2>
                    <Table responsive id="customers">
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>Patient Name</th>
                                <th>Patient Age</th>
                                <th>Patient Group</th>
                                <th>Patient Gender</th>
                                <th>Patient Phone</th>
                                <th>Patient Address</th>
                                <th>Patient Units</th>
                                <th>Status</th>
                                <th>Action</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((patient) => (
                                <tr key={patient.patient_id}>
                                    <td>{patient.patient_id}</td>
                                    <td>{patient.patient_name}</td>
                                    <td>{patient.patient_age}</td>
                                    <td>{patient.patient_group}</td>
                                    <td>{patient.patient_gender}</td>
                                    <td>{patient.patient_phone}</td>
                                    <td>{patient.patient_address}</td>
                                    <td>{patient.patient_unit}</td>
                                    <td>{patient.status}</td>
                                  
                                    <td>
        <button   class="button-7" role="button" onClick={() => handleApprove(patient.patient_id)} 
        disabled={patient.status === 'approved' || approvedRequests.includes(patient.patient_id)}
        >
          {patient.status === 'pending' ? 'Approve' : 'Approved'}
       </button>
      </td>                       
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>


            <div className="user-list-container">
                <h1  className="has_header">Has Table</h1>
                <Table responsive id="customers">
                    <thead>
                        <tr>
                            <th>Blood Bank ID</th>
                            <th>Blood Group ID</th>
                            <th>Units</th>
                            <th>Blood Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.bloodbank_id}</td>
                                <td>{item.bloodgroup_id}</td>
                                <td>{item.units}</td>
                                <td>{item.bloodgroup}</td>
                                <td>
                      
                                <Link to={`/edit/${item.bloodbank_id}`}>
                        <button className='user_edit_button'>Edit</button>
                      </Link>
                                <button   onClick={() => handleDelete(item.bloodbank_id)} className='user_delete_button'>Delete</button>
                    </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


        </div>
    );
}

export default AdminDashboard;


// completed without approve system

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar';

// import { Table } from 'reactstrap';
// import  '../css/AdminDashboard.css'


// function AdminDashboard() {
//     const location = useLocation();
//     const [adminData, setAdminData] = useState(null);
//     const [bloodBankData, setBloodBankData] = useState(null);

//     const [request, setRequest] = useState([]);

//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//               const response = await axios.get('http://localhost:8080/requestblood');
//               console.log(response.data);
//               setRequest(response.data);
//             } catch (error) {
//               console.error('Error fetching data:', error.message);
//             }
//           };
      
//           fetchData();


//         if (location.state && location.state.adminData && location.state.bloodBankData) {
//             setAdminData(location.state.adminData);
//             setBloodBankData(location.state.bloodBankData);
//         }
//     }, [location.state]);


//     const handleDelete = (id)=>{
//                 axios.delete('http://localhost:8080/delete/'+id)
//                 .then(res =>{
//                     // location.reload();
//                 })
//                 .catch(err=> console.log(err));
//              }

//     return (
//         <>
//         <div className="container">
//             <Sidebar />
//             {adminData && bloodBankData &&
//                 <div>
//                     <h2>Welcome, {adminData.admin_email}</h2>
//                     <p>Blood Bank Details:</p>
//                     <p>ID: {bloodBankData.bloodbank_id}</p>
//                     <p>Blood Bank Name: {bloodBankData.bloodbank_name}</p>
               
//                 </div>
//             }
//         </div>


//         <div className="user-list-container">
//             <div  className='user-list'>
//       <h2  className='request_header'>Patient Table</h2>
//       <Table responsive id='customers'>
//         <thead>
//           <tr>
//             <th>Patient ID</th>
//             <th>Patient Name</th>
//             <th>Patient Age</th>
//             <th>Patient Group</th>
//             <th>Patient Gender</th>
//             <th>Patient Phone</th>
//             <th>Patient Address</th>
//             <th>Patient units</th>
//           </tr>
//         </thead>
//         <tbody>
//           {request.map((Patient) => (
//             <tr key={Patient.patient_id}>
//               <td>{Patient.patient_id}</td>
//               <td>{Patient.patient_name}</td>
//               <td>{Patient.patient_age}</td>
//               <td>{Patient.patient_group}</td>
//               <td>{Patient.patient_gender}</td>
//               <td>{Patient.patient_phone}</td>
//               <td>{Patient.patient_address}</td>
//               <td>{Patient.patient_unit}</td>

          
//             </tr>
//           ))}
//         </tbody>
    
//       </Table>
//       </div>
//     </div>

//         </>
//     );
// }

// export default AdminDashboard;







 // old 


// import React from 'react'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// import  '../css/AdminDashboard.css'
// import Create from './Create';
// import Sidebar from './Sidebar';
// import { useLocation } from 'react-router-dom';


//  function AdminDashboard() {
//   const location = useLocation();
//   const adminEmail = location.state?.email;

//     const [data, setData] = useState([]);
//         const [groupCounts, setGroupCounts] = useState({});
    
//         useEffect(() => {
//           const fetchData = async () => {
//             try {
//               const response = await axios.get('http://localhost:8080/admindashboard');
//               console.log(response.data);
//               setData(response.data);
      
//               // Calculate counts for each user_group
//               const counts = response.data.reduce((acc, donation) => {
//                 acc[donation.user_group] = (acc[donation.user_group] || 0) + 1;
//                 return acc;
//               }, {});
//               setGroupCounts(counts);
//             } catch (error) {
//               console.error('Error fetching data:', error.message);
//             }
//           };
      
//           fetchData();
//         }, []);
      
    
//      const handleDelete = (id)=>{
//         axios.delete('http://localhost:8080/delete/'+id)
//         .then(res =>{
//             // location.reload();
//         })
//         .catch(err=> console.log(err));
//      }
//     return (
//         <>

// <div className="container">
// <Sidebar/>
      
// <div className="admin-email">
//           {adminEmail && <p>Welcome, {adminEmail}!</p>}
//         </div>
        
//         <div className="user-list-container">
          
//           <div className='user-list'>
//           <h1>Welcome to admin dashboard</h1>
//             <h2>User list</h2>

//             <table id='customers'>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Gender</th>
//                   <th>Age</th>
//                   <th>Blood Group</th>
//                   <th>Address</th>
//                   <th>Phone</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(data) && data.map((donation, index) => (
//                   <tr key={index}>
//                     <td>{donation.user_id}</td>
//                     <td>{donation.user_name}</td>
//                     <td>{donation.user_gender}</td>
//                     <td>{donation.user_age}</td>
//                     <td>{donation.user_group}</td>
//                     <td>{donation.user_address}</td>
//                     <td>{donation.user_phone}</td>
//                     <td>
//                       <Link to={`/edit/${donation.user_id}`}>
//                         <button className='user_edit_button'>Edit</button>
//                       </Link>
//                       <button onClick={() => handleDelete(donation.user_id)} className='user_delete_button'>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

          
//         <div className='groupsCount'>

//               <table id="bloodGroups">
//                 <thead>
//                   <tr>
//                     <th>Blood Group</th>
//                     <th>Unit</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.keys(groupCounts).map((group, index) => (
//                     <tr key={index}>
//                       <td>{group}</td>
//                       <td>{groupCounts[group]}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//         </div>

        
         
//       </div>
//     </>
//   )
// }

//  export default AdminDashboard;





