import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { useNavigate } from 'react-router-dom';

const ChatScreen = () => {

    const [chats, setChats] = useState([]);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchChats = async () => {

      const userDetails = localStorage.getItem('connectionsUser')


      const config = {
        headers: {
            authorization: `Bearer ${userDetails.token}`
        }
    }

        const {data} = await axios.get("/chats", config)
        console.log(data)
        setChats(data)
    }

    const handleLogout = () => {
      dispatch(logout())
      navigate("/")

    }

    useEffect(() => {
        // fetchChats()
    }, [])

  return (
    <div>
      <h1>ChatScreen</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default ChatScreen
