import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const GoogleLoginBtn = () => {

    const navigate = useNavigate()

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);

    const { credential } = credentialResponse;


    // Decode the ID token to get user profile details
    const decodedToken = jwtDecode(credential);
    console.log('Decoded Token:', decodedToken);

    // Extract user information from decoded token
    const profile = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };

    console.log('Profile:', profile);
    // Use profile information as needed

    navigate("/chats")
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
