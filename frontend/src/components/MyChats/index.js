import { Box, List, ListItem, ListItemText, Typography, ListItemButton, Skeleton, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllChats } from '../../actions/chatActions'
import NewGroupModal from '../NewGroupModal'

const SkeletonContainer = ({ containerHeight }) => {
  const skeletonHeight = 60; // Height of one Skeleton component in pixels
  const containerHeightInPx = parseInt(containerHeight, 10); // Convert containerHeight to a number

  const numberOfSkeletons = Math.ceil(containerHeightInPx / skeletonHeight);

  const skeletons = Array.from({ length: numberOfSkeletons });

  return (
    <div style={{ height: containerHeight }}>
      {skeletons.map((_, index) => (
        <Box className="flex justify-between mt-2" >
          <Skeleton key={index} variant="rounded" width={300} height={60} />
        </Box>
      ))}
    </div>
  );
};

const MyChats = ({chatId}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userChats = useSelector(state => state.userChats)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const { chats, loading } = userChats

  useEffect(() => {
    dispatch(getAllChats())

  }, [dispatch])



  return (
    <Box className="w-1/4 p-2 shadow">
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography>My Chats</Typography>
        <NewGroupModal />
      </Box>

    {loading && <Stack>
      <SkeletonContainer containerHeight="90vh" />
      </Stack>}

      <List>
        {chats?.map(eachChat => {

          let chatName = eachChat.chatName

          const highlight = chatId === eachChat._id && {backgroundColor: 'lightBlue'}

          if (eachChat.isGroupChat === false) {
            chatName = eachChat.users[0]._id === userInfo._id ? eachChat.users[1].name : eachChat.users[0].name
          }

          return (
            <ListItem key={eachChat._id}>
              <ListItemButton sx={highlight} onClick={
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