import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginBtn = () => {

  const navigate = useNavigate()


  const getData = async (credential) => {
    try {

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const {data} = await axios.post("/users/login", { token: credential }, config)
      localStorage.setItem("connectionsUser", JSON.stringify(data));
      navigate("/chats")
    } catch (error) {
      console.error('Error fetching user:', error);
    }

  }

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    getData(credential)
  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="67340924048-m3dd8mt4ugn04j5nc4kjf50orj7lddcq.apps.googleusercontent.com">
      <div>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginBtn;
