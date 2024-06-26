import { Box, Typography } from '@mui/material'
import React from 'react'
import SideDrawer from '../SideDrawer'
import ProfileModal from '../ProfileModal'
import Notifications from '../Notifications'

const Header = () => {
  // sx={{ display: 'flex', justifyContent: 'space-around', height: '10vh' }}
  return (
    <Box className="flex flex-row justify-between p-2 shadow">
      <Typography variant='h5'>C🔆nnecti🌒ns</Typography>
      <Box className='flex justify-around'>
      <SideDrawer />
      <ProfileModal />
      <Notifications />
      </Box>
    </Box>
  )
}

export default Header
