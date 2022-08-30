import React from 'react'

const Menu = ({props}) => {

  const {cuUser, setMessage, setPage, cuAgent, users, agents, page,cuPil, userAgent} = props;

  return (
    <div className="account_items">
        <span onClick={() => setPage(1)} className={page === 1? 'account_active_span': 'account_span'}>Dashibodi</span>
        <span onClick={() => setPage(2)} className={page === 2? 'account_active_span': 'account_span'}>Meseji</span>
     
        {cuPil && 
        <>
          <span onClick={() => setPage(4)} className={page === 4? 'account_active_span': 'account_span'}>Maombi ya Hijja au Umrah</span>
          <span onClick={() => setPage(15)} className={page === 15? 'account_active_span': 'account_span'}>Wakala Wangu</span>  
          <span onClick={() => setPage(16)} className={page === 16? 'account_active_span': 'account_span'}>Viza</span>
            <span onClick={() => setPage(17)} className={page === 17? 'account_active_span': 'account_span'}>Tiketi</span>
            <span onClick={() => setPage(3)} className={page === 3? 'account_active_span': 'account_span'}>Picha za Hijja</span>
            <span onClick={() => setPage(9)} className={page === 9? 'account_active_span': 'account_span'}>Bili na Malipo</span>      
        </>
        }

        {cuAgent  &&
            <>
            <span onClick={() => setPage(11)} className={page === 11? 'account_active_span': 'account_span'}>Maombi ya Wakala</span> 
            <span onClick={() => setPage(6)} className={page === 6? 'account_active_span': 'account_span'}>Mahujaji</span> 

            <span onClick={() => setPage(16)} className={page === 16? 'account_active_span': 'account_span'}>Viza</span>
            <span onClick={() => setPage(17)} className={page === 17? 'account_active_span': 'account_span'}>Tiketi</span>
            <span onClick={() => setPage(3)} className={page === 3? 'account_active_span': 'account_span'}>Picha za Hijja</span>
            <span onClick={() => setPage(9)} className={page === 9? 'account_active_span': 'account_span'}>Bili na Malipo</span>
            <span onClick={() => setPage(18)} className={page === 18? 'account_active_span': 'account_span'}>Watumiaji</span>
            
            </>
        }
         {/* {cuAgent || cuPil && <>
          <span onClick={() => setPage(16)} className={page === 16? 'account_active_span': 'account_span'}>Viza</span>
            <span onClick={() => setPage(17)} className={page === 17? 'account_active_span': 'account_span'}>Tiketi</span>
            <span onClick={() => setPage(3)} className={page === 3? 'account_active_span': 'account_span'}>Picha za Hijja</span>
            <span onClick={() => setPage(9)} className={page === 9? 'account_active_span': 'account_span'}>Bili na Malipo</span>
        </>} */}
                       
      
    </div>
  )
}

export default Menu
