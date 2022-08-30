import React from 'react'
import useData from '../../../../hooks/useData'
import PieChat from './PieChat'


const MaritalPie = () => {

  const { pilgrims } = useData()

  const items = pilgrims.map((d) => d.marital).filter((marital, index, array) => array.indexOf(marital) === index)
  const counts = items.map(name => ({
      name: name,
      count: pilgrims.filter(item => item.marital === name).length
  }));

  // const gender = counts.map((data) => data.name)
  // const value = counts.map((data) => data.count)
  const label = 'Marital Status'
  const titte = 'Applicants Marital Status'
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


export default MaritalPie
