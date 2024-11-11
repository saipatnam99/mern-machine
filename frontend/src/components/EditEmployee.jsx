import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

function EditEmployee() {
  const { id } = useParams(); // Get the employee ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: 'M',
    courses: [],
    image: '', // Add image key to store the image path/URL
  });
  const [image, setImage] = useState(null); // Holds the new image to be uploaded
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Holds the preview of selected image

  // useEffect(() => {
  //   // Fetch the employee data based on the ID
  //   setIsLoading(true);
  //   axios.get(`http://localhost:3000/api/employee/${id}`)
  //     .then((response) => {
  //       setFormData(response.data);
  //       setImagePreview(response.data.image); // Set the image preview to the existing image
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setMessage("Error fetching employee data.");
  //       setIsLoading(false);
  //     });
  // }, [id]);
  useEffect(() => {
    // Fetch the employee data based on the ID
    setIsLoading(true);
    axios.get(`http://localhost:3000/api/employee/${id}`)
      .then((response) => {
        setFormData(response.data);
        // Set the image preview with the correct full URL
        setImagePreview(response.data.image ? `http://localhost:3000/${response.data.image}` : null);
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage("Error fetching employee data.");
        setIsLoading(false);
      });
  }, [id]);

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
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      // Generate preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the preview with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    
    // Append form fields to FormData
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        updatedFormData.append(key, formData[key]);
      }
    }

    // If an image is selected, append it to the FormData
    if (image) {
      updatedFormData.append('image', image);
    }

    setIsLoading(true);

    try {
      const res = await axios.put(`http://localhost:3000/api/employee/${id}`, updatedFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage("Employee updated successfully");
      // Optionally clear form state after update or reset form data
      setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: 'M',
        courses: [],
        image: '',
      });
      setImage(null); // Clear image state
      navigate('/employeelist'); // Navigate to employee list after update
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold bg-yellow-200 mb-6">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto space-y-4">
        
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
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
              <span className="block font-semibold mb-1">Course</span>
              <div className="space-y-2">
                <label>
                  <input
                    type="checkbox"
                    value="MCA"
                    checked={formData.courses.includes("MCA")}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2">MCA</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="BCA"
                    checked={formData.courses.includes("BCA")}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2">BCA</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="BSC"
                    checked={formData.courses.includes("BSC")}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2">BSC</span>
                </label>
              </div>
            </div>
{/* 
            Display the existing image if available
            {formData.image && !imagePreview && (
              <div className="mt-4">
                <span className="block font-semibold mb-2">Existing Image</span>
                <img
                  src={`http://localhost:3000/uploads/${formData.image}`}
                  alt="Employee"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )}

            {/* Display the image preview if a new image is selected */}
            {/* {imagePreview && (
              <div className="mt-4">
                <span className="block font-semibold mb-2">Image Preview</span>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )} */}

            {/* <div>
              <span className="block font-semibold mb-1">Img Upload</span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
                className="w-full p-2 border rounded"
              />
            </div> */} 
              {/* Display the existing image if available */}
          {formData.image&& !imagePreview && (
            <div className="mt-4">
              <span className="block font-semibold mb-2">Existing Image</span>
              <img
                src={`http://localhost:3000/${formData.image}`}
                alt="Employee"
                className="w-32 h-32 object-cover border rounded"
              />
            </div>
          )}

          {/* Display the image preview if a new image is selected */}
          {imagePreview && (
            <div className="mt-4">
              <span className="block font-semibold mb-2">Image Preview</span>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded"
              />
            </div>
          )}

          {/* Image upload input */}
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
          </>
        )}
      </form>
    </>
  );
}

export default EditEmployee;
