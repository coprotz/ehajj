import React from 'react'
import moment from 'moment'

const Chatlists = ({setChat, cuPil, chat, messages}) => {
    const friend = chat?.members?.find((item) => item.id !== cuPil?.id)

    // const sender = chat?.sender?.name || chat?.receiver?.name

    // console.log('chat', chat)
  return (
    <div className='chat_card' onClick={() => setChat(chat)}>
        <div className="chat_card_info">
          {cuPil ? <span>{chat?.sender?.name[0]}</span> : <span>{chat?.sender?.name[0]}</span> }
       
        </div>
        <div className="chat_card_body">
        <div className="chat_card_top">
            {cuPil? <h4>{chat?.sender?.name}</h4> : <h4>{chat?.receiver?.length > 1 ? "Mahujaji": 'Monica'}</h4>}            
            <small>{moment(chat?.timeStamp?.toDate()).fromNow()}</small>
     
        </div>
        {messages && messages.find((m) => m?.chatId === chat?.id)?.subject}
        </div>
    
  </div>
  )
}

export default Chatlists
