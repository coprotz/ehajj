import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import './search.css'

const Search = () => {
  const { t } = useTranslation();
  return (
    <div className='search'>        
        <BiSearchAlt/>
        <input type="text" placeholder={`${t('write_to_search')}`}  className='search_input'/>
    </div>
  )
}

export default Search
