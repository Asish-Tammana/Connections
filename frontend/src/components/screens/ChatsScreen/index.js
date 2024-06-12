import React from 'react'
import MyChats from '../../MyChats';
import ChatBox from '../../ChatBox';
import { Box } from '@mui/material';
import Header from '../../Header';


const ChatScreen = () => {


  return (
    <Box sx={{width: '100%'}}>
      <Header />
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <MyChats />
        <ChatBox />
      </Box>
    </Box>
  )
}

export default ChatScreen
