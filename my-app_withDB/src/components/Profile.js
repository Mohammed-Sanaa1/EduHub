import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const profile = JSON.parse(localStorage.getItem('profile')) || false;
  const storedId = JSON.parse(localStorage.getItem('authData')) || "0";
  const userId = storedId; // Assuming you have a user ID
  // const apiUrl = `http://localhost:8500/users/${userId}`;
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [ERROR, setError] = useState(false);
  const [ERROR2, setError2] = useState(false);


  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    let updatedData = {};
    let check = false;
    if(ERROR2){
      setError2(false);
    }

    if(currentPassword && newPassword){
      check = true;
      if(user){
        if(user.username && user.email){
          updatedData={
            id: storedId,
            username: user.username,
            email: user.email,
            password: newPassword,
            oldPassword: currentPassword
          }
        }
        else if(user.username){
          updatedData={
            id: storedId,
            username: user.username,
            password: newPassword,
            oldPassword: currentPassword
          }
        }
        else if(user.email){
          updatedData={
            id: storedId,
            email: user.email,
            password: newPassword,
            oldPassword: currentPassword
          }
        }
        
      }
      else{
        updatedData={
          id: storedId,
          password: newPassword,
          oldPassword: currentPassword
        }
      }
    }
    else if(!currentPassword && newPassword){
      check = false;
      setError2(true);
    }
    else if(user.username || user.email){
      check = true;
      if(user.username && user.email){
        updatedData={
          id: storedId,
          username: user.username,
          email: user.email
        }
      }
      else if(user.username){
        updatedData={
          id: storedId,
          username: user.username
        }
      }
      else{
        updatedData={
          id: storedId,
          email: user.email
        }
      }
    }

    console.log(updatedData);
    if(check){
      fetch("http://127.0.0.1:3501/users", {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) =>{
          if(data.message == "wrong password")
            setError(true)
          else{
            setError(false)
            const profileData = {
              username: data.username,
              email: data.email
            }
            console.log(data);
            localStorage.setItem('profile', JSON.stringify(profileData));
            setIsEditing(false);
            
          }
            
        })
        .catch((error) => console.error('Error updating user data:', error));
    }

  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4" style={{"color": "#007bff"}}>User Profile</h2>
              <Form>
                {isEditing ? (
                  <div>
                    <Form.Group controlId="username">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                      />
                    </Form.Group>
  
                    <Form.Group controlId="newPassword">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        //value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
  
                    <Form.Group controlId="currentPassword">
                      <Form.Label>Current Password:</Form.Label>
                      <Form.Control
                        type="password"
                        // value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      {ERROR && (
                        <Form.Text className="text-danger">Current password is incorrect</Form.Text>
                      )}
                      {ERROR2 && (
                        <Form.Text className="text-danger">You must enter current password</Form.Text>
                      )}
                    </Form.Group>
  
                    <Form.Group controlId="email">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </Form.Group>
                  </div>
                ) : (
                  <div>
                    <p>Username: {profile?`${profile.username}`:""}</p>
                    <p>Password: ********</p>
                    <p>Email: {profile?`${profile.email}`:""}</p>
                  </div>
                )}
  
                <div className="mt-3 text-center">
                  {isEditing ? (
                    <Button variant="primary" onClick={handleSave}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={handleEdit}>
                      Edit
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
