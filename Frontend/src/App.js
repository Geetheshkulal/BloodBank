  import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Donate from './components/Donate';
import Blood from './components/Blood';

import Platelete from './components/Platelete';
import Stemcell from './components/Stemcell';
import Contact from './components/Contact';
  import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Admin from './Adminmain/Admin';
import Read from './Adminmain/Read';
import Edit from './Adminmain/Edit';
import Sidebar from './Adminmain/Sidebar';
import Create from './Adminmain/Create';
import Donorlist from './Adminmain/Donorlist';
import Requestedlist from './Adminmain/Requestedlist'
import Requestblood from './components/Requestblood';
// import About from './Adminmain/About';
// import Comment from './Adminmain/Comment';
// import Analytics from './Adminmain/Analytics'
// import Product from './Adminmain/Product';
// import ProductList from './Adminmain/ProductList';
import AdminDashboard from './Adminmain/AdminDashboard';
import Footer from './components/Footer';






  function App() {
    return (
      <div className="App">
      
        <BrowserRouter>

        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Service' element={<Service/>}/>
          <Route path='/Donate' element={<Donate/>}/>
          <Route path='/Blood' element={<Blood/>}/>
    
          <Route path='/Platelete' element={<Platelete/>}/>
          <Route path='/Stemcell' element={<Stemcell/>}/>
          <Route path='/Contact'element={<Contact/>}/>
          <Route path='/Admin' element={<Admin/>}/>
           <Route path='/Sidebar' element={<Sidebar/>}/>
           <Route path='/Donorlist' element={<Donorlist/>}/>
           <Route path='/Requestedlist'element={<Requestedlist/>}/>
           <Route path='/Requestblood' element={<Requestblood/>}/>
           
          <Route path="/Create" element={<Create/>} />
          {/* <Route path="/Analytics" element={<Analytics />} /> */}
          {/* <Route path="/Product" element={<Product />} /> */}
          <Route path='/Footer' element={<Footer/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/read/:id' element={<Read/>} />
          <Route path='/edit/:id' element={<Edit/>} />

        </Routes>
        </BrowserRouter>
       
    
      </div>
    );
  }

  export default App;
