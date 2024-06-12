import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllChats } from '../../actions/chatActions'

const MyChats = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllChats())

  }, [dispatch, navigate])

  const userChats = useSelector(state => state.userChats)
  const {chats} = userChats

  return (
    <Box sx={{width: '30%'}}>
      <Typography>My Chats</Typography>
      <List>
        {chats?.map(eachChat =>(
          <ListItem key={eachChat._id}>
            <ListItemText primary={eachChat.chatName} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default MyChats
