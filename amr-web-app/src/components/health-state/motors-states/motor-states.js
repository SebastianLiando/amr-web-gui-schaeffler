import React from 'react'

import Expandable from '../../expandable/expandable'
import StatusListContent from '../../list-content/status-list-content/status-list-content'

/**
 * This component displays the robot's motors states: the name of the motor, the status condition
 * (ok, warning, or error), and the details of the status condition.
 * 
 * Props:
 * - width - The width of the component
 * - data - An array of motor state
 * 
 * Example data:
 * ```
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
  ```
 */
const motorStates = ({ data, width }) => {
  return (
    <Expandable title="Motors" width={width}>
      <StatusListContent data={data} />
    </Expandable>
  )
}

export default React.memo(motorStates)
