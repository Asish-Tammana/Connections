import { Box, Typography } from '@mui/material'
import React from 'react'
import UpdateGroupModal from '../UpdateGroupModal'

const ChatBox = () => {
  return (
    <Box sx={{width: '70%'}}>
      <Typography>Chat Box</Typography>
      <UpdateGroupModal />
    </Box>
  )
}

export default ChatBox
