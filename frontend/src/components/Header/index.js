import { Box, Typography } from '@mui/material'
import React from 'react'
import SideDrawer from '../SideDrawer'
import ProfileModal from '../ProfileModal'
import Notifications from '../Notifications'

const Header = () => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', height: '10%' }}>
      <SideDrawer />
      <Typography>Header</Typography>
      <ProfileModal />
      <Notifications />
    </Box>
  )
}

export default Header
