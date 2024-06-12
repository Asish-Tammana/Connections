import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllChats } from '../../../actions/chatActions';
import MyChats from '../../MyChats';
import ChatBox from '../../ChatBox';
import { Box } from '@mui/material';
import Header from '../../Header';


const ChatScreen = () => {

  // const [chats, setChats] = useState([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userChats = useSelector(state => state.userChats)
  console.log(userChats)
  

  useEffect(() => {
    dispatch(getAllChats())

  }, [dispatch, navigate])

  return (
    <Box sx={{width: '100%'}}>
      <Header />
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <MyChats />
        <ChatBox />
      </Box>
    </Box>
  )
}

export default ChatScreen
