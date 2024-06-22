import React from 'react'
import MyChats from '../../MyChats';
import ChatBox from '../../ChatBox';
import { Box } from '@mui/material';
import Header from '../../Header';


const ChatScreen = () => {

  const chatId = window.location.pathname.split('/').reverse()[0]

  return (
    <Box sx={{width: '100%'}}>
      <Header />
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', minHeight: '90%'}}>
        <MyChats chatId={chatId} />
        {(chatId !== "chats") ? <ChatBox chatId={chatId} />: <div><h1>Open any chat</h1></div>}
      </Box>
    </Box>
  )
}

export default ChatScreen
