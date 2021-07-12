import React from 'react'

import Expandable from '../../expandable/expandable'
import SimpleListContent from '../../list-content/simple-list-content/simple-list-content'

import {
  faBatteryFull,
  faThermometerThreeQuarters,
  faRoute,
} from '@fortawesome/free-solid-svg-icons'

/**
 * This component displays the general robot health state: battery level, temperature, and distance
 * travelled. Battery level is in percentage. Temperature is in degree Celsius. Distance travelled
 * is in meters.
 * 
 * Props:
 * - width - The width of the component
 * - data - The general health state data
 * 
 * Example data:
 * ```
    data = {
        battery: 54.4123,
        temperature: 25.531323,
        distance: 10.2315,
    }
  ```
 */
const generalHealthState = ({ width, data }) => {
  return (
    <Expandable title="General" width={width}>
      <SimpleListContent
        data={[
          {
            icon: faBatteryFull,
            title: 'Battery',
            value: data ? `${data['battery'].toFixed(2)}%` : '',
          },
          {
            icon: faThermometerThreeQuarters,
            title: 'Temperature',
            value: data ? `${data['temperature'].toFixed(2)}℃` : '',
          },
          {
            icon: faRoute,
            title: 'Distance Travelled',
            value: data ? `${data['distance'].toFixed(2)} m` : '',
          },
        ]}
      />
    </Expandable>
  )
}

export default React.memo(generalHealthState)
