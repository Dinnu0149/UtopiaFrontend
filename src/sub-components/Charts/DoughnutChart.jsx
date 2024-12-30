import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart({data, options, headerTitle}) {
  return (
    <div>
    <h5 className='fs-3'>{headerTitle}</h5>
    <Doughnut data={data} options={options} />
</div>  
  )
}

export default DoughnutChart