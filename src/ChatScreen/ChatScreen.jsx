import React from 'react'
import Sidebar from '../components/Sidebar'
import MainMenuPage from '../components/MainMenuPage'

function ChatScreen() {
  return (
    <div className='flex'>
        <Sidebar />
        <MainMenuPage />
    </div>
  )
}

export default ChatScreen