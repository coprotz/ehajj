import React from 'react'
import useData from '../../../../hooks/useData'
import PieChat from './PieChat'


const IbadaCompletePie = () => {

  const { pilgrims } = useData()

  const items = pilgrims.map((d) => d.status).filter((status, index, array) => array.indexOf(status) === index)
  const counts = items.map(name => ({
      name: name,
      count: pilgrims.filter(item => item.status === name).length
  }));

  // const gender = counts.map((data) => data.name)
  // const value = counts.map((data) => data.count)
  const label = 'Status'
  const titte = 'Applicants Status'
  return (
    <div>
        <PieChat
          datalabel={counts.map((data) => data.name)}
          dataUse={counts.map((data) => data.count)}
          label={label}
          title={titte}
        
        />
      
    </div>
  )
}


export default IbadaCompletePie
