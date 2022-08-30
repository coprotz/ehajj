import React from 'react'
import useData from '../../../../hooks/useData'
import PieChat from './PieChat'


const GenderPie = () => {

  const { pilgrims } = useData()

  const genders = pilgrims.map((d) => d.gender).filter((gender, index, array) => array.indexOf(gender) === index)
  const counts = genders.map(gender => ({
      name: gender,
      count: pilgrims.filter(item => item.gender === gender).length
  }));

  const gender = counts.map((data) => data.name)
  const value = counts.map((data) => data.count)
  const label = 'Gender'
  const titte = 'Applicants Gender'
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

export default GenderPie
