import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './UserCard.css';
import profile from '../../images/profile.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function UserCard({ users }) {
  const navigate = useNavigate();

  const handleViewProfile = (profileData) => {
    navigate('/details', { state: { profileData } });
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
              {/* <Typography variant="subtitle1"><strong>Price: {result.price}</strong></Typography> */}
              {/* <Typography variant="subtitle2"><strong>Location: {result.location}</strong></Typography>
              <Typography variant="body2">Experience: {result.experience} years</Typography> */}
              <div className='ProfileDes'>
                <Typography variant="body1">{result.bio}</Typography>
              </div>
              <div className="DetailsLine">
                <div className="DetailItem">
                  <WorkIcon fontSize="small" />
                  <Typography variant="subtitle2" className="DetailValue">{result.experience} years</Typography>
                </div>
                <div className="DetailItem">
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="subtitle2" className="DetailValue">{result.location}</Typography>
                </div>
                <div className="DetailItem">
                <AttachMoneyIcon fontSize="small" />
                  <Typography variant="subtitle2" className="DetailValue">{result.price}</Typography>
                </div>
              </div>
            </div>
            <div className='ProfileRatingCol'>
              <div className='RatingR'>{result.rating}</div>
              <Typography variant="body1" className='DisplayR'>Rating</Typography>
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
