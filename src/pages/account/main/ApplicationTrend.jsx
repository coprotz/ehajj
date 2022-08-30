import React from 'react'
// import useData from '../../../../hooks/useData'
import LineChat from '../reports/line/LineChat'
// import PieChat from './PieChat'


const ApplicationTrend = () => {

//   const { pilgrims } = useData()

//   const items = pilgrims.map((d) => d.ibada).filter((ibada, index, array) => array.indexOf(ibada) === index)
//   const counts = items.map(name => ({
//       name: name,
//       count: pilgrims.filter(item => item.ibada === name).length
//   }));

  const dataLabel = ['07-Aug-22','14-Aug-22', '21-Aug-22', '29-Aug-22']
  const value = [5,11,3,15]
  const label = 'Application Trend'
  const titte = 'Application Trend in a weeks'
  return (
    <div>
        <LineChat
          datalabel={dataLabel}
          dataUse={value}
          label={label}
          title={titte}
        
        />
      
    </div>
  )
}
export default ApplicationTrend
