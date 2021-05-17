import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import GeneralHealthState from '../components/health-state/general-health-state/general-health-state'
import MotorStates from '../components/health-state/motors-states/motor-states'
import SensorsStates from '../components/health-state/sensors-states/sensors-states'
import Odometry from '../components/nav/odometry/odometry'
import StatusChip from '../components/status-chip/status-chip'
import TaskTab from '../components/task-list/tab/tasks-tab'
import TaskText from '../components/task-list/text/task-list-text'

import {
  generalHealthData as dummyGeneralHealthData,
  motorData,
  odometryData as dummyOdometryData,
  sensorData,
  tasksData,
} from '../dummy/data'

const useStyles = makeStyles({
  app: {
    width: '100%',
  },
})

const app = () => {
  const classes = useStyles()

  const [connected, setConnected] = useState(false)
  const [image, setImage] = useState('')
  const [odometryData, setOdometryData] = useState(dummyOdometryData)
  const [generalHealthData, setGeneralHealthData] = useState(
    dummyGeneralHealthData
  )

  const [taskTabIndex, setTaskTabIndex] = useState(0)

  const connectToWebSocket = () => {
    const timeout = 5000
    let connectTimeoutId

    const ws = new WebSocket('ws://localhost:8765')

    ws.onopen = () => {
      setConnected(true)
      console.log('Connected to websocket')
      clearTimeout(connectTimeoutId)
    }

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data)

      switch (payload.subject) {
        case 'rviz':
          setImage(payload.data)
          break
        case 'odometry':
          setOdometryData(payload.data)
          break
        case 'general':
          setGeneralHealthData(payload.data)
          break
      }
    }

    ws.onclose = () => {
      setConnected(false)
      console.log(
        'Disconnected from websocket, reconnecting in ' +
          timeout / 1000 +
          ' seconds'
      )

      connectTimeoutId = setTimeout(() => {
        console.log('Reconnecting to websocket')
        connectToWebSocket()
      }, timeout)
    }

    ws.onerror = () => {
      console.log('Socket error! Closing socket')
      ws.close()
    }
  }

  // componentDidMount - connect to websocket
  useEffect(() => {
    connectToWebSocket()
  }, [])

  return (
    <Box className={classes.app}>
      <StatusChip title="WS" type={connected === true ? 'ok' : 'error'} />

      <GeneralHealthState width="50%" data={generalHealthData} />

      <SensorsStates width="50%" data={sensorData} />

      <MotorStates width="50%" data={motorData} />

      <TaskText
        taskName="Move to Waypoint A"
        isComplete={false}
        taskDetail="This is the task description for move to waypoint A. This will appear only if the expand button is clicked."
      />

      <Box style={{ backgroundColor: 'black', width: '50%', height: '300px' }}>
        <Odometry width="30%" data={odometryData} />
      </Box>

      <TaskTab
        onTabChange={(index) => setTaskTabIndex(index)}
        value={taskTabIndex}
        tasks={tasksData}
      />

      {image !== '' ? (
        <img width={800} height={400} src={`data:image/png;base64,${image}`} />
      ) : null}
    </Box>
  )
}

export default app
