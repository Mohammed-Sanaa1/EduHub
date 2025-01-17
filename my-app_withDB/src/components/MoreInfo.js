import React, { useState } from 'react';
import './styles/register.css';

export default function MoreInfo() {

  const storedId = JSON.parse(localStorage.getItem('authData')) || "0";
  const userId = storedId; // Assuming you have a user ID
  const apiUrl = `http://127.0.0.1:3501/users`;
  
  const [formData, setFormData] = useState({
    name: '',
    Age: '',
    gender: '',
  });
  const [age, setAge] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleChangeAge = (e) => {
    const { value } = e.target;
    setAge(value);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'id':userId, 'age':age})
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error updating user data:', error));
    
    window.location.href = '/interests';
  };

  return (
    <div className='moreContainer theContainer col-md-5 col-lg-4'>
      <h3>Registration Info</h3>
      <form className='more_form' onSubmit={handleSubmit}>
        <div className='mb-3 more_mb-3'>
          <label htmlFor='name' className='form-label'>
            Name:
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-3 more_mb-3'>
          <label htmlFor='birthday' className='form-label'>
            Age:
          </label>
          <input
            type='number'
            className='form-control'
            id='birthday'
            name='Age'
            value={formData.birthday}
            onChange={handleChangeAge}
            required
          />
        </div>

        <div className='mb-3 more_mb-3'>
          <label htmlFor='gender' className='form-label'>
            Gender:
          </label>
          <select
            className='form-select'
            id='gender'
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value='' disabled>Select your gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary more_btn'>
          Submit
        </button>
      </form>
    </div>
  );
}
