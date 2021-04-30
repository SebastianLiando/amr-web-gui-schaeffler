import React from 'react'

import Expandable from '../../expandable/expandable'
import SimpleListTile from '../../list-item/simple-list-tile/simple-list-tile'

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
      <SimpleListTile
        icon={faBatteryFull}
        title="Battery"
        value={`${data['battery'].toFixed(2)}%`}
      />

      <SimpleListTile
        icon={faThermometerThreeQuarters}
        title="Temperature"
        value={`${data['temperature'].toFixed(2)}℃`}
      />

      <SimpleListTile
        icon={faRoute}
        title="Distance Travelled"
        value={`${data['distance'].toFixed(2)} m`}
      />
    </Expandable>
  )
}

export default generalHealthState
