import React from 'react'

import Expandable from '../../expandable/expandable'
import SimpleListContent from '../../list-content/simple-list-content/simple-list-content'

import {
  faBatteryFull,
  faThermometerThreeQuarters,
  faRoute,
} from '@fortawesome/free-solid-svg-icons'

/*
    data = {
        battery: 54.4123, in percentage
        temperature: 25.531323, in Celcius
        distance: 10.2315, in meter
    }

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

export default generalHealthState
