import React from 'react'

import Expandable from '../../expandable/expandable'
import StatusListContent from '../../list-content/status-list-content/status-list-content'

/*
Data example

  data: [
    {
      id: 'a',
      name: 'Sensor A',
      status: 'ok',
      details: 'This sensor is working properly.',
    },
    {
      id: 'b',
      name: 'Sensor B',
      status: 'warning',
      details:
        'This sensor is working, but there is an indication of overheating.',
    },
  ]

  status -> ok, warning, or error
*/
const motorStates = ({ data, width }) => {
  return (
    <Expandable title="Motors" width={width}>
      <StatusListContent data={data} />
    </Expandable>
  )
}

export default React.memo(motorStates)
