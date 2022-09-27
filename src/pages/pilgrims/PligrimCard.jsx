import React from 'react'
import useData from '../../hooks/useData'
import './pilgrims.css'
import moment from 'moment'

const PligrimCard = ({d}) => {
    const { agents } = useData()

    const agent = agents?.find(a => a.id === d?.agentId)
  return (
    <tr key={d.id}>
        <td data-label='Name'>{d.fname} {d.lname}</td>
        <td data-label='Sex'>{d.gender}</td>
        <td data-label='Age'>32</td>
        <td data-label='Ibada Type'>{d.ibada}</td>
        <td data-label='Created At'>{moment(d.createdAt?.toDate()).fromNow()}</td>
        <td data-label='Application Status'>{d.status}</td>
        <td data-label='Agent'>{agent?.name || agent?.coName}</td>
    </tr>
  )
}

export default PligrimCard
