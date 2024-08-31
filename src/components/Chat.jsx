import React, { useContext, useState } from 'react';
import Cam from '../img/cam.png';
import Add from '../img/add.png';
import More from '../img/more.png';
import Messages from './Messages';
import Input from './Input';
import StarredMessage from './StarredMessage';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [showStarredMessages, setShowStarredMessages] = useState(false);

  const handleMoreClick = () => {
    setShowStarredMessages(prevState => !prevState);
  };

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{showStarredMessages ? 'yıldızlı mesajlar' : data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={Cam} alt=''/>
          <img src={Add} alt=''/>
          <img src={More} alt='' onClick={handleMoreClick} style={{ cursor: 'pointer' }} />
        </div>
      </div>
      {showStarredMessages ? (
        <StarredMessage />
      ) : (
        <>
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
};

export default Chat;
