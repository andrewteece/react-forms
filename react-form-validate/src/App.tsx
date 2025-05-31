import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import './assets/form.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const isValidate = () => {
    const errors = {};
    let isValid = true;

    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact number is required';
      isValid = false;
    }

    if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Invalid Contact number';
      isValid = false;
    }

    if (!formData.address) {
      errors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.city) {
      errors.city = 'City is required';
      isValid = false;
    }

    if (!formData.state) {
      errors.state = 'State is required';
      isValid = false;
    }

    if (!formData.country) {
      errors.country = 'Country is required';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // if(!(await isValidate())) {
    //   return ;
    // }

    let apiUrl = 'http://localhost:8082/saveUserData';
    // API call to send data to server
    try {
      const response = await axios.post(apiUrl, formData);
      console.log(response);
      setError({});
    } catch (error) {
      console.log('error occurred while api calling ' + error);

      if (error.response && error.response.status == 400) {
        const apiErrors = {};

        error.response.data.forEach((err) => {
          apiErrors[err.field] = err.defaultMessage;
        });

        setError(apiErrors);
      } else {
        alert('Some thing is wrong');
      }
    }
  };

  return (
    <div className='App'>
      <h2> Form Handling</h2>

      <form onSubmit={handleSubmit} className='form-container'>
        {/* First Row */}
        <div className='form-group-container'>
          <div className='form-group'>
            <label>First Name </label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />
            {error.firstName && (
              <span className='error-message'>{error.firstName}</span>
            )}
          </div>

          <div className='form-group'>
            <label>Last Name </label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
            {error.lastName && (
              <span className='error-message'>{error.lastName}</span>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className='form-group-container'>
          <div className='form-group'>
            <label>Email </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && (
              <span className='error-message'>{error.email}</span>
            )}
          </div>

          <div className='form-group'>
            <label>Contact Number </label>
            <input
              type='tel'
              name='contactNumber'
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {error.contactNumber && (
              <span className='error-message'>{error.contactNumber}</span>
            )}
          </div>
        </div>

        {/* Third Row */}
        <div className='form-group-container'>
          <div className='form-group'>
            <label>Address </label>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
            />
            {error.address && (
              <span className='error-message'>{error.address}</span>
            )}
          </div>

          <div className='form-group'>
            <label>City </label>
            <input
              type='text'
              name='city'
              value={formData.city}
              onChange={handleChange}
            />

            {error.city && <span className='error-message'>{error.city}</span>}
          </div>
        </div>

        {/* Fourth Row */}
        <div className='form-group-container'>
          <div className='form-group'>
            <label>State </label>
            <input
              type='text'
              name='state'
              value={formData.state}
              onChange={handleChange}
            />
            {error.state && (
              <span className='error-message'>{error.state}</span>
            )}
          </div>

          <div className='form-group'>
            <label>Country </label>
            <input
              type='text'
              name='country'
              value={formData.country}
              onChange={handleChange}
            />
            {error.country && (
              <span className='error-message'>{error.country}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className='submit-div'>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
