import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UpdateGroupModal from '../UpdateGroupModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, sendNewMessage } from '../../actions/messageActions'

const ChatBox = ({ chatId }) => {

  const [userMessage, setUserMessage] = useState('');

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const chatMessages = useSelector(state => state.chatMessages)
  const { messagesList } = chatMessages;


  const dispatch = useDispatch()

  const sendMessageToReceiver = async (e) => {
    e.preventDefault();

    const newMsg = await dispatch(sendNewMessage(userMessage, chatId))
    newMsg.content = userMessage;
    messagesList.push(newMsg)
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
      <Box sx={{ height: '90%', backgroundColor: 'pink', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'flex-end' }}>
        <form onSubmit={sendMessageToReceiver} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '7%' }}>
          <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
          <button type="submit">Send</button>
        </form>

        <Box sx={{ height: '93%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflowY: 'scroll', scrollbarWidth: 'none' }}>
          {messagesList?.map(message => {
            const direction = message.sender._id === userInfo._id ? 'right' : 'left';
            if (direction === 'right') {
              return <Typography key={message._id} sx={{m:1}} style={{ textAlign: direction }}>{message.content}</Typography>
            } else {
              return (
                <Box sx={{display: 'flex', m:1}}>
                  {direction === 'left' && <img src={message.sender.picture} alt={message.sender.name} style={{ height: '30px', width: '30px' }} />}
                  <Typography key={message._id} style={{ textAlign: direction }}>{message.content}</Typography>
                </Box>
              )
            }
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default ChatBox
