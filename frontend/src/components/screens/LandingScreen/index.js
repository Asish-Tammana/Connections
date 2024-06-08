import React from 'react'
import GoogleLoginBtn from '../../GoogleLoginBtn'
import { Box, Container, Typography } from '@mui/material';
import { landingContainer, titleContainer } from './style';

const LandingScreen = () => {
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
