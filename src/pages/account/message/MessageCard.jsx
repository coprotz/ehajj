import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import moment from 'moment'
import {motion} from 'framer-motion'

const MessageCard = ({message}) => {

    console.log('msg', message)
    const { user } = useAuth();

    const { uid, text, name, createdAt } = message
    const messageClass = uid === user?.uid ? 'sent' : 'received';
    const bgClass = uid === user?.uid ? 'right' : 'left';
  return (
    <motion.div 
    layout
      className={`messages_inner ${bgClass}`}>
        <div className={`message_card ${messageClass}`}>
            <h5 className='send_name'>{name}</h5>
            <p className='sender_text'>{text}</p>
            <small className='last_time'>{moment(createdAt && createdAt.toDate()).fromNow(true)}</small> 
        </div>
    </motion.div>
  )
}

export default MessageCard
