
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import  Employee from './components/Employee'
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployee';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />        
      </Routes>
    </Router>
  );
}

export default App;


