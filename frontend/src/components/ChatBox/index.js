import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UpdateGroupModal from '../UpdateGroupModal';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, getMessages, sendNewMessage } from '../../actions/messageActions';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
let socket, chatCompare;

const ChatBox = ({ chatId }) => {
  const [userMessage, setUserMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userChats = useSelector((state) => state.userChats);
  const { chats } = userChats;

  const chatMessages = useSelector((state) => state.chatMessages);
  const { messagesList } = chatMessages;

  const notifications = useSelector((state) => state.notifications);
  const { notificationsList } = notifications;

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', userInfo);
    socket.on('connected', () => {
      setSocketConnected(true);
    });

    socket.on('message received', (newMessageReceived) => {
      if (!chatCompare || chatId !== newMessageReceived.chat._id || !chatId || chatId === "chats") {
        
        if(!notificationsList.includes(newMessageReceived)){
          dispatch(addNotification(newMessageReceived))
        }
        
      } else {
        setSelectedChatMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

  }, [chatId, userInfo]);

  const sendMessageToReceiver = async (e) => {
    e.preventDefault();
    const newMsg = await dispatch(sendNewMessage(userMessage, chatId));
    newMsg.content = userMessage;
    setSelectedChatMessages((prevMessages) => [...prevMessages, newMsg]);
    setUserMessage('');
    socket.emit('new message', newMsg);
  };

  const getMessagesFromDatabase = () => {
    setLoading(true)
    dispatch(getMessages(chatId));
    setSelectedChatMessages(messagesList);
    socket.emit('join chat', chatId);
    setLoading(false)
  };

  useEffect(() => {
    if (chatId) {
      setSelectedChatMessages([])
      getMessagesFromDatabase();
      console.log(chatId);
      chatCompare = chats?.find((chat) => chat._id === chatId);
    }
  }, [chatId, dispatch, chats, messagesList]);

  return (
    <Box sx={{ width: '75%', p: 1, height: '80vh', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '100%', height: '10vh' }}>
        <Typography>Enjoy the conversation</Typography>
        <UpdateGroupModal />
      </Box>
      {loading && <Typography>Loading...</Typography>}

        <Box sx={{
          minHeight: '70vh',
          maxHeight: '70vh',
          backgroundColor: 'lightBlue',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflowY: 'scroll',
        }} >
          {selectedChatMessages?.map((message) => {
            const direction = message.sender._id === userInfo._id ? 'right' : 'left';
            if (direction === 'right') {
              return <Typography key={message._id} sx={{ m: 1 }} style={{ textAlign: direction }}>{message.content}</Typography>;
            } else {
              return (
                <Box sx={{ display: 'flex', m: 1 }} key={message._id}>
                  {direction === 'left' && <img src={message.sender.picture} alt={message.sender.name} style={{ height: '30px', width: '30px' }} />}
                  <Typography style={{ textAlign: direction }}>{message.content}</Typography>
                </Box>
              );
            }
          })}
        </Box>
        <form onSubmit={sendMessageToReceiver} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '7vh', backgroundColor: 'gray', padding: 3 }}>
          <input  className="rounded p-1" placeholder="Type something........" type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
          <Button type="submit">Send</Button>
        </form>
    </Box>
  );
};

export default ChatBox;