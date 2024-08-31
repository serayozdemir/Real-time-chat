import React, { useContext, useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';


const StarredMessage = () => {
  const { currentUser } = useContext(AuthContext);
  const [starredMessages, setStarredMessages] = useState([]);

  useEffect(() => {
    const fetchStarredMessages = async () => {
      try {
        const q = query(collection(db, 'starredMessages'), where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStarredMessages(messages);
      } catch (error) {
        console.error('Error fetching starred messages:', error);
      }
    };
  
    fetchStarredMessages();
  }, [currentUser.uid]); 

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [starredMessages]); 

  return (

      <div className="messages">
        {starredMessages.map(item => (
          <div key={item.id} className={`message ${item.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
              <span>{item.senderName}</span>
            </div>
            <div className='messageContent'>
              <p>{item.message}</p>
              {item.img && <img src={item.img} alt="" />}
            </div>
          </div>
        ))}
        <div ref={ref} />
      </div>

  );
}

export default StarredMessage;
