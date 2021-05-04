import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

import GeneralHealthState from './components/health-state/general-health-state/general-health-state'
import StatusListContent from './components/list-content/status-list-content/status-list-content'

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
        width="400px"
        data={{
          battery: 95.293847,
          temperature: 37.49873,
          distance: 54.12385,
        }}
      />

      <StatusListContent
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
    </Box>
  )
}

export default app
