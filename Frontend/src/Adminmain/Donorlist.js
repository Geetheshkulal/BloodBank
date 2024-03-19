
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../css/Donorlist.css';

function Donorlist() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/donatelist');
        console.log(response.data);
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const filteredDonors = donors.filter(donor =>
    donor.donor_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: 'ID',
      selector: row => row.donor_id,
      sortable: true
    },
    {
      name: 'Name',
      selector: row => row.donor_name,
      sortable: true
    },
    {
      name: 'Age',
      selector: row => row.donor_age,
      sortable: true
    },
    {
      name: 'Blood Group',
      selector: row => row.donor_group,
      sortable: true
    },
    {
      name: 'Gender',
      selector: row => row.donor_gender,
      sortable: true
    },
    {
      name: 'Phone',
      selector: row => row.donor_phone,
      sortable: true
    },
    {
      name: 'City',
      selector: row => row.donor_address,
      sortable: true
    },
   
  ];

  return (
    <>
      <div className="container_donor">
        <h1>Donor List</h1>

        <div className="donor-list-container">
          <div className="search-container">
            <input
            className='donor_search'
              type="text"
              placeholder="Search donors by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className='donor-list'>
            <h2>Donor Details</h2>

            <DataTable
              columns={columns}
              data={filteredDonors}
              pagination
              defaultSortField="donor_id"
              defaultSortAsc={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Donorlist;









// copy

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import '../css/Donorlist.css';

// function Donorlist() {
//   const [donors, setDonors] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/donateblood');
//         console.log(response.data);
//         setDonors(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredDonors = donors.filter(donor =>
//     donor.donor_name.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: 'ID',
//       selector: row => row.donor_id,
//       sortable: true
//     },
//     {
//       name: 'Name',
//       selector: row => row.donor_name,
//       sortable: true
//     },
//     {
//       name: 'Age',
//       selector: row => row.donor_age,
//       sortable: true
//     },
//     {
//       name: 'Blood Group',
//       selector: row => row.donor_group,
//       sortable: true
//     },
//     {
//       name: 'Gender',
//       selector: row => row.donor_gender,
//       sortable: true
//     },
//     {
//       name: 'Phone',
//       selector: row => row.donor_phone,
//       sortable: true
//     },
//     {
//       name: 'City',
//       selector: row => row.donor_address,
//       sortable: true
//     }
//   ];

//   return (
//     <>
//       <div className="container_donor">
//         <h1>Donor List</h1>

//         <div className="donor-list-container">
//           <div className="search-container">
//             <input
//             className='donor_search'
//               type="text"
//               placeholder="Search donors by name"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//           </div>

//           <div className='donor-list'>
//             <h2>Donor Details</h2>

//             <DataTable
//               columns={columns}
//               data={filteredDonors}
//               pagination
//               defaultSortField="donor_id"
//               defaultSortAsc={true}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Donorlist;


// 1st one

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import $ from 'jquery';
// import 'jquery/dist/jquery';
// import 'datatables.net';
// import 'datatables.net-dt';



// import 'datatables.net';

// function Donorlist() {
//   const [donors, setDonors] = useState([]);
//   const tableRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/donateblood');
//         console.log(response.data);
//         setDonors(response.data);

//         // Check if DataTable is already initialized
//         if (!$.fn.DataTable.isDataTable(tableRef.current)) {
//           // Initialize DataTables
//           $(tableRef.current).DataTable({
//             // Add additional configurations here
//             searching: true, // Enable searching
//             paging: true, // Enable pagination
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <h1>Donor List</h1>

//         <div className="donor-list-container">
//           <div className='donor-list'>
//             <h2>Donor Details</h2>

//             <table ref={tableRef} id='donorsTable'>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Age</th>
//                   <th>Blood Group</th>
//                   <th>Gender</th>
//                   <th>Phone</th>
//                   <th>City</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(donors) && donors.map((donor, index) => (
//                   <tr key={index}>
//                     <td>{donor.donor_id}</td>
//                     <td>{donor.donor_name}</td>
//                     <td>{donor.donor_age}</td>
//                     <td>{donor.donor_group}</td>
//                     <td>{donor.donor_gender}</td>
//                     <td>{donor.donor_phone}</td>
//                     <td>{donor.donor_city}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Donorlist;

