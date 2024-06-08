import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatScreen = () => {

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const {data} = await axios.get("/chats")
        setChats(data)
    }

    useEffect(() => {
        fetchChats()
    }, [])

  return (
    <div>
      <h1>ChatScreen</h1>
    </div>
  )
}

export default ChatScreen
