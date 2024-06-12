import { Box, Typography } from '@mui/material'
import React from 'react'
import SideDrawer from '../SideDrawer'
import ProfileModal from '../ProfileModal'

const Header = () => {

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-around' }}>
        <SideDrawer />
      <Typography>Header</Typography>
      <ProfileModal />
      
    </Box>
  )
}

export default Header
