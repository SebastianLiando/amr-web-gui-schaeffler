import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

import GeneralHealthState from './components/health-state/general-health-state/general-health-state'
import MotorStates from './components/health-state/motors-states/motor-states'
import SensorsStates from './components/health-state/sensors-states/sensors-states'
import Odometry from './components/nav/odometry/odometry'
import {
  generalHealthData,
  motorData,
  odometryData,
  sensorData,
} from './dummy/data'

const useStyles = makeStyles({
  app: {
    width: '100%',
  },
})

const app = () => {
  const classes = useStyles()

  return (
    <Box className={classes.app}>
      <GeneralHealthState width="50%" data={generalHealthData} />

      <SensorsStates width="50%" data={sensorData} />

      <MotorStates width="50%" data={motorData} />

      <Box style={{ backgroundColor: 'black', width: '50%', height: '300px' }}>
        <Odometry width="30%" data={odometryData} />
      </Box>
    </Box>
  )
}

export default app
