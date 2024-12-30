import React from 'react'
import { Bar} from "react-chartjs-2";

function BarChart({data, options, headerTitle}) {
    
  return (
    <div>
        <h5 className='fs-3'>{headerTitle}</h5>
        <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart