import React, { useState } from 'react';
import './styles/interests.css';
import Technology from '../img/Technology.jpg';
import Business from '../img/Business.jpg';
import Arts from '../img/Arts.jpg';
import Science from '../img/Science.jpg';
import Cooking from '../img/Cooking.jpg';
import Health from '../img/Health.jpg';
import Language from '../img/Language.jpg';
import Trading from '../img/trading.jpg';


function Interests(){

    const [selectedInterests, setSelectedInterests] = useState([]);

    const toggleSelection = (interest) => {
      const isSelected = selectedInterests.includes(interest);
  
      if (isSelected) {
        setSelectedInterests(selectedInterests.filter((selectedInterest) => selectedInterest !== interest));
      } else {
        setSelectedInterests([...selectedInterests, interest]);
      }
    };
  
    const saveSelection = () => {
      localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
      window.location.href = '/dashboard';
    };
  
    const interestsData = [
      { id: 1, name: 'Technology', imageUrl: Technology, alt: 'Technology' },
      { id: 2, name: 'Business and Finance', imageUrl: Business, alt: 'Business and Finance' },
      { id: 3, name: 'Arts', imageUrl: Arts, alt: 'Arts' },
      { id: 4, name: 'Science', imageUrl: Science, alt: 'Science' },
      { id: 5, name: 'Cooking', imageUrl: Cooking, alt: 'Cooking' },
      { id: 6, name: 'Health and Wellness', imageUrl: Health, alt: 'Health' },
      { id: 7, name: 'Language Learning', imageUrl: Language, alt: 'Language Learning' },
      { id: 8, name: 'Trading', imageUrl: Trading, alt: 'Trading' },

    ];
  
    return (
      <main>
        <div className="container mt-5 py-4">
          <h1 style={{ textAlign: 'center' }}>Select Your Interests</h1>
          <div id="interests-container" className="d-flex flex-wrap">
            {interestsData.map((interest) => (
              <InterestItem
                key={interest.id}
                interest={interest}
                selectedInterests={selectedInterests}
                toggleSelection={toggleSelection}
              />
            ))}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary2 mt-3" onClick={saveSelection}>
              Next
            </button>
          </div>
        </div>
      </main>
    );
  };
  
  const InterestItem = ({ interest, selectedInterests, toggleSelection }) => {
    const isSelected = selectedInterests.includes(interest.name);
  
    const handleClick = () => {
      toggleSelection(interest.name);
    };
  
    return (
      <div className={`col-lg-3 col-md-4 col-sm-6 text-center`}>
        <img src={interest.imageUrl} alt={interest.alt} className={`interest-img ${isSelected ? 'selected' : ''}`} onClick={handleClick} />
        <p className='PP'>{interest.name}</p>
      </div>
    );
  };
export default Interests;