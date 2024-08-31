import React, { useContext, useState, useEffect, useRef } from 'react';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { addDoc, collection, query, where, deleteDoc,doc, getDoc, getDocs } from 'firebase/firestore';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [isStarred, setIsStarred] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    // Kullanıcının giriş yaptığında yıldızlanmış mesajları kontrol et
    const checkStarredMessages = async () => {
      try {
        const q = query(collection(db, 'starredMessages'), where('uid', '==', currentUser.uid), where('message', '==', message.text));
        const querySnapshot = await getDocs(q);
        setIsStarred(querySnapshot.size > 0); // Yıldızlanmış mı kontrol et
      } catch (error) {
        console.error('Error checking starred messages:', error);
      }
    };
    checkStarredMessages();
  }, [currentUser.uid, message.text]);

  const handleToggleStar = async () => {
    try {
      // Mesajın göndericisinin UID'sini message objesinden alın
      const senderUID = message.senderId;
  
      // Kullanıcının adını almak için firestore sorgusu yapın
      const senderDoc = await getDoc(doc(db, 'users', senderUID));
      if (senderDoc.exists()) {
        const senderName = senderDoc.data().displayName;
  
        if (!isStarred) {
          // Yıldızlı mesajı Firestore'a ekle
          await addDoc(collection(db, 'starredMessages'), {
            uid: currentUser.uid,
            senderName: senderName,  // Gönderen kişinin adını burada kullanıyoruz
            name: data.user?.displayName,
            message: message.text,
          });
        } else {
          // Yıldızlı mesajı Firestore'dan silme
          const q = query(
            collection(db, 'starredMessages'),
            where('uid', '==', currentUser.uid),
            where('name', '==', data.user?.displayName),
            where('senderName', '==', senderName),  // Güncellenmiş senderName kullanıyoruz
            where('message', '==', message.text)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
  
        // Yıldız durumunu güncelle
        setIsStarred(!isStarred);
      } else {
        console.error("Gönderen kullanıcı bulunamadı");
      }
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <div className='heart'>
          <HeartSwitch
            size="sm"
            inactiveTrackFillColor="#cffafe"
            inactiveTrackStrokeColor="#22d3ee"
            activeTrackFillColor="#06b6d4"
            activeTrackStrokeColor="#0891b2"
            inactiveThumbColor="#ecfeff"
            activeThumbColor="#ecfeff"
            checked={isStarred} // `checked` yerine `isStarred` durumunu kullanın
            onChange={handleToggleStar}
          />
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    </div>
  );
}

export default Message;
