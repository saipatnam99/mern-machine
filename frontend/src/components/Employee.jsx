import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function EmployeeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: 'M',
    courses: [],
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      courses: checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value),
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Create an object URL for the image to display the preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the image preview URL
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    form.append('image', image);

    console.log(form);
    try {
      const res = await axios.post('https://mern-machine.vercel.app/api/employee', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Employee created successfully');
      console.log(res.data);
      navigate('/employeelist');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 bg-yellow-200">Create Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto space-y-4">

        <div>
          <span className="block font-semibold mb-1">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter name"
          />
        </div>

        <div>
          <span className="block font-semibold mb-1">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
        </div>

        <div>
          <span className="block font-semibold mb-1">Mobile No</span>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter mobile number"
          />
        </div>

        <div>
          <span className="block font-semibold mb-1">Designation</span>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <span className="block font-semibold mb-1">Gender</span>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
              />
              <span className="ml-2">Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleChange}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div>
          <span className="block font-semibold mb-1 p-2">Course</span>
          <div className="space-y-2 gap-2">
            <label>
              <input
                type="checkbox"
                value="MCA"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">MCA</span>
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">BCA</span>
            </label>
            <label>
              <input
                type="checkbox"
                value="BSC"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">BSC</span>
            </label>
          </div>
        </div>
         {/* Image preview section */}
         {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover border rounded" />
          </div>
        )}
        <div>
          <span className="block font-semibold mb-1">Img Upload</span>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg, image/png"
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Submit
        </button>

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      </form>
    </>
  );
}

export default EmployeeForm;
