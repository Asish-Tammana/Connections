import React from 'react'
import MyChats from '../../MyChats';
import ChatBox from '../../ChatBox';
import { Box, Typography } from '@mui/material';
import Header from '../../Header';


const ChatScreen = () => {

  const chatId = window.location.pathname.split('/').reverse()[0]

  return (
    <Box sx={{width: '100%'}}>
      <Header />
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', minHeight: '90%'}}>
        <MyChats chatId={chatId} />
        {(chatId !== "chats") ? <ChatBox chatId={chatId} />: <Box className="flex justify-center items-center" sx={{width: '75%'}}>
          <Typography variant='h3'>Start your conversation!!</Typography>
          </Box>}
      </Box>
    </Box>
  )
}

export default ChatScreen
