import { Box, List, ListItem, ListItemText, Typography, ListItemButton, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllChats } from '../../actions/chatActions'

const MyChats = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userChats = useSelector(state => state.userChats)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const { chats } = userChats

  useEffect(() => {
    dispatch(getAllChats())

  }, [dispatch, navigate])



  return (
    <Box sx={{ width: '30%' }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography>My Chats</Typography>
        <Button>New Group</Button>
      </Box>
      <List>
        {chats?.map(eachChat => {

          let chatName = eachChat.chatName

          if (eachChat.isGroupChat === false) {
            chatName = eachChat.users[0]._id === userInfo._id ? eachChat.users[1].name : eachChat.users[0].name
          }

          return (
            <ListItem key={eachChat._id}>
              <ListItemButton onClick={
                () => navigate(`/chats/${eachChat._id}`)
              }>
                <ListItemText primary={chatName} />
              </ListItemButton>
            </ListItem>
          )
        }
        )}
      </List>
    </Box>
  )
}

export default MyChats