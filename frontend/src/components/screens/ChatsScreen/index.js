import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { getAllChats } from '../../../actions/chatActions';
import SideDrawer from '../../SideDrawer';
import MyChats from '../../MyChats';
import ChatBox from '../../ChatBox';
import { Box, Container, Typography } from '@mui/material';


const ChatScreen = () => {

  const [chats, setChats] = useState([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogout = () => {
    dispatch(logout(navigate))
  }

  useEffect(() => {
    dispatch(getAllChats())

  }, [dispatch, navigate])

  return (
    <Box sx={{width: '100%'}}>
      <SideDrawer />
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <MyChats />
        <ChatBox />
      </Box>
    </Box>
  )
}

export default ChatScreen
