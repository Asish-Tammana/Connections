import { Box, Button, FormControl, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UpdateGroupModal from '../UpdateGroupModal'
import { Form } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMessages, sendNewMessage } from '../../actions/messageActions'

const ChatBox = ({chatId}) => {

  const [userMessage, setUserMessage] = useState('');
  const dispatch = useDispatch()

  const sendMessageToReceiver = (e) => {
    e.preventDefault();
    
    
    dispatch(sendNewMessage(userMessage, chatId))
    setUserMessage('')
  }

  useEffect(() => {

    dispatch(getMessages(chatId))

  }, [chatId, dispatch])

  return (
    <Box sx={{ width: '70%', p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '10%' }}>
        <Typography>Chat Box</Typography>
        <UpdateGroupModal />
      </Box>
      <Box sx={{ height: '90%', backgroundColor: 'pink', display: 'flex', flexDirection: 'column-reverse' }}>
        <form onSubmit={sendMessageToReceiver} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '7%'  }}>
            <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
            <button type="submit">Send</button>
        </form>

        

      </Box>
    </Box>
  )
}

export default ChatBox
