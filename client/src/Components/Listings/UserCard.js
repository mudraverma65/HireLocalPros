import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './UserCard.css';
import profile from '../../images/profile.jpg';

function UserCard({ users }) {
  const navigate = useNavigate();

  const handleViewProfile = (profileData) => {
    navigate('/profile', { state: { profileData } });
  };

  return (
    <div className='Frame'>
      {users && users.length > 0 ? (
        users.map((result) => (
          <div key={result._id} className='ResultsRow' onClick={() => handleViewProfile(result)}>
            <div className='ProfileImgCol'>
              <img src={profile} className="ProfileImgResults" alt='logo' />
            </div>
            <div className='ProfileCol'>
              <Typography variant="h6">{result.name} </Typography>
              {/* <body><strong>Category: {result.category}</strong></body> */}
              <Typography variant="subtitle1"><strong>Price: {result.price}</strong></Typography>
              <div className='ProfileDes'>
                <Typography variant="body1">{result.bio}</Typography>
              </div>
            </div>
            <div className='ProfileRatingCol'>
              <div className='RatingR'>{result.rating}</div>
              <Typography variant="body1">Rating</Typography>
              <div className='ViewProfile'>
                <div className='PrimaryButton' onClick={() => handleViewProfile(result)}>View Profile</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No search results found.</div>
      )}
    </div>
  );
}

export default UserCard;
