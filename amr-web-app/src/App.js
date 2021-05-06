import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import GeneralHealthState from './components/health-state/general-health-state/general-health-state'
import MotorStates from './components/health-state/motors-states/motor-states'
import SensorsStates from './components/health-state/sensors-states/sensors-states'
import Odometry from './components/nav/odometry/odometry'
import StatusChip from './components/status-chip/status-chip'

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

  const [connected, setConnected] = useState(false)

  const connectToWebSocket = () => {
    const timeout = 5000
    let connectTimeoutId

    const ws = new WebSocket('ws://localhost:8765')

    ws.onopen = () => {
      setConnected(true)
      console.log('Connected to websocket')
      clearTimeout(connectTimeoutId)
    }

    ws.onmessage = () => {
      console.log('Received message')
    }

    ws.onclose = () => {
      setConnected(false)
      console.log('Disconnected from websocket')
    }

    ws.onerror = err => {
      console.log('Socket error: ' + err.message)
      ws.close()

      connectTimeoutId = setTimeout(() => {
        console.log('Reconnecting to websocket')
        connectToWebSocket()
      }, timeout);
    }
  }

  // componentDidMount - connect to websocket
  useEffect(() => {
    connectToWebSocket()
  }, [])

  return (
    <Box className={classes.app}>
      <StatusChip
        title="WS"
        type={connected === true ? 'ok' : 'error'}
      />

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
