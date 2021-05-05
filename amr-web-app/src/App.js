import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

import GeneralHealthState from './components/health-state/general-health-state/general-health-state'
import MotorStates from './components/health-state/motors-states/motor-states'
import SensorsStates from './components/health-state/sensors-states/sensors-states'
import Odometry from './components/nav/odometry/odometry'

const useStyles = makeStyles({
  app: {
    width: '100%',
  },
})

const app = () => {
  const classes = useStyles()

  return (
    <Box className={classes.app}>
      <GeneralHealthState
        width="50%"
        data={{
          battery: 95.293847,
          temperature: 37.49873,
          distance: 54.12385,
        }}
      />

      <SensorsStates
        width="50%"
        data={[
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
          {
            id: 'c',
            name: 'Sensor C',
            status: 'error',
            details:
              'This sensor is not working at all! Try restarting the sensor.',
          },
        ]}
      />
      <MotorStates
        width="50%"
        data={[
          {
            id: 'a',
            name: 'Motor A',
            status: 'ok',
            details: 'This motor is working properly.',
          },
          {
            id: 'b',
            name: 'Motor B',
            status: 'warning',
            details:
              'This motor is working, but there is an indication of overheating.',
          },
          {
            id: 'c',
            name: 'Motor C',
            status: 'error',
            details:
              'This motor is not working at all! Try restarting the motor.',
          },
        ]}
      />

      <div style={{ backgroundColor: 'black', width: '50%', height: '300px' }}>
        <Odometry
          width="30%"
          data={{
            yaw: 65.432123,
            vel_yaw: 4.4234,
            x: 32.353234,
            vel_x: 3.124321,
            acc_x: 3.5123,
            y: 54.33495,
            vel_y: 4.3432,
            acc_y: 1.23123,
          }}
        />
      </div>
    </Box>
  )
}

export default app
