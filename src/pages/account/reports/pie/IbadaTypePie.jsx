import React from 'react'
import useData from '../../../../hooks/useData'
import PieChat from './PieChat'


const IbadaTypePie = () => {

  const { pilgrims } = useData()

  const items = pilgrims.map((d) => d.ibada).filter((ibada, index, array) => array.indexOf(ibada) === index)
  const counts = items.map(name => ({
      name: name,
      count: pilgrims.filter(item => item.ibada === name).length
  }));

  // const gender = counts.map((data) => data.name)
  // const value = counts.map((data) => data.count)
  const label = 'Status'
  const titte = 'Ibada Type'
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

export default IbadaTypePie
