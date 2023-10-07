import React from 'react'
import { Chatbot } from 'react-chatbot-kit';
import config from './chatbot/config';
import ActionProvider from './chatbot/ActionProvider';
import MessageParser from './chatbot/MessageParser';
import 'react-chatbot-kit/build/main.css';

const App = () => {

  return (
    <div className='App'>
      <header className='AppHeader'>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </header>
    </div>
  )
}

export default App