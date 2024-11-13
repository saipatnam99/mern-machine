import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://mern-machine.vercel.app/api/employee")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/editemployee/${id}`);
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://mern-machine.vercel.app/api/employee/${_id}`)
          .then(() => {
            setEmployees(employees.filter((employee) => employee._id !== _id));
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the employee.",
              "error"
            );
            console.error(error);
          });
      }
    });
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.includes(searchTerm) ||
      employee.email.includes(searchTerm) ||
      employee.mobile.includes(searchTerm) ||
      employee.designation.includes(searchTerm) ||
      employee.courses.includes(searchTerm)
    );
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Adds leading zero if day < 10
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-4">
      <Navbar />
      <header className="flex justify-between items-center bg-yellow-200 p-2">
        <span className="font-bold">Employee List</span>
      </header>

      <div className="bg-white p-2">
        <div className="flex justify-end items-center gap-32 mb-2">
          <span className="font-bold px-8">
            Total Count: {filteredEmployees.length}
          </span>
          <button
            className="bg-green-300 px-16 rounded text-left"
            onClick={() => navigate("/employee")}
          >
            Create Employee
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="text-right bg-blue-300 flex flex-col-reverse px-8">
            {/* Empty cells to align the search bar over specific columns */}
            <td colSpan="6"></td>
            <td colSpan="4" className="p-2 text-right">
              <span className="gap-2 px-6">search:</span>
              <input
                type="text"
                placeholder="Search employees..."
                className="px-2 border-2 rounded gap-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </td>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border">Unique ID</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Mobile No</th>
                <th className="p-2 border">Designation</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Create Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} className="border-t">
                  <td className="p-2 border">{employee._id}</td>
                  <td className="p-2 border">
                    {/* Display employee image with proper path */}
                    <img
  src={`http://localhost:3000/${employee.imageUrl}`} // Assuming 'employee.image' contains the filename
  alt="profile"
  className="h-10 w-10"
/>
                  </td>
                  <td className="p-2 border">{employee.name}</td>
                  <td className="p-2 border text-blue-600">
                    <a href={`mailto:${employee.email}`}>{employee.email}</a>
                  </td>
                  <td className="p-2 border">{employee.mobile}</td>
                  <td className="p-2 border">{employee.designation}</td>
                  <td className="p-2 border">{employee.gender}</td>
                  <td className="p-2 border">{employee.courses}</td>
                  <td className="p-2 border">{formatDate(employee.createDate)}</td>
                  <td className="p-2 border text-center">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
