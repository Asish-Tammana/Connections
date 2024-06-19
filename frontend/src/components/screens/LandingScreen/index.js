import React, { useEffect } from 'react'
import GoogleLoginBtn from '../../GoogleLoginBtn'
import { Box, Container, Typography } from '@mui/material';
import { landingContainer, titleContainer } from './style';
import { useNavigate } from 'react-router-dom';

const LandingScreen = () => {

  const navigate = useNavigate()

  useEffect(() =>{
    const userDetails = localStorage.getItem('connectionsUser')

    if(userDetails){
      navigate('/chats')
    }

  },[navigate])

  return (
    <Container maxWidth="xl" sx={landingContainer}>
      <Box sx={titleContainer}>
        <Typography variant='h4'>Connections</Typography>
      </Box>
      <GoogleLoginBtn />
    </Container>
  )
}

export default LandingScreen
