import React from 'react'
import {Line} from "react-chartjs-2";

function LineChart({data, options, headerTitle}) {
  return (
    <div>
        <h5 className='fs-3'>{headerTitle}</h5>
        <Line data={data} options={options} />
    </div>
  )
}

export default LineChart