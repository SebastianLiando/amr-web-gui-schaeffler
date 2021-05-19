import {
  AppBar,
  Box,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'

import { Alert, TabContext, TabPanel } from '@material-ui/lab'

import GeneralHealthState from '../../components/health-state/general-health-state/general-health-state'
import MotorStates from '../../components/health-state/motors-states/motor-states'
import SensorsStates from '../../components/health-state/sensors-states/sensors-states'
import Odometry from '../../components/nav/odometry/odometry'
import StatusChip from '../../components/status-chip/status-chip'
import TaskTab from '../../components/task-list/tab/tasks-tab'
import TaskText from '../../components/task-list/text/task-list-text'

import {
  generalHealthData as dummyGeneralHealthData,
  motorData,
  odometryData as dummyOdometryData,
  sensorData,
  tasksData,
} from '../../dummy/data'
import { BrightnessHigh, BrightnessLow } from '@material-ui/icons'
import { statusChipTypes } from '../../components/status-chip/const'
import { mainTabs } from './const'

const useStyles = makeStyles({
  app: {
    width: '100%',
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
  },

  appBar: {
    flex: '0 0 auto',
  },

  content: {
    flex: '1 0 auto',
  },

  grid: {
    height: '100%',
    // flex: '1 0 auto',
  },
})

const app = () => {
  const classes = useStyles()

  // WebSocket server connection state
  const [connected, setConnected] = useState(false)
  const [image, setImage] = useState('')

  // Odometry state
  const [odometryData, setOdometryData] = useState(dummyOdometryData)

  // General health state
  const [generalHealthData, setGeneralHealthData] = useState(
    dummyGeneralHealthData
  )

  // Error message to be displayed in the snack bar
  const [errorMessage, setErrorMessage] = useState('')

  // Currently selected index for the task tab
  const [taskTabIndex, setTaskTabIndex] = useState(0)

  // Currently selected index for the main tab
  const [mainTabIndex, setMainTabIndex] = useState(mainTabs.STATES)

  // Light or dark theme state
  const [isLightTheme, setLightTheme] = useState(true)

  const [maxBodyHeight, setMaxBodyHeight] = useState('100%')

  const heightRef = useRef()

  const timeout = 5000

  const connectToWebSocket = () => {
    let connectTimeoutId

    setErrorMessage('')
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
      const message =
        'Disconnected from websocket, reconnecting in ' +
        timeout / 1000 +
        ' seconds'

      console.log(message)
      setErrorMessage(message)

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

  useEffect(() => {
    // Handle the max height for the right box
    // eslint-disable-next-line no-unused-vars
    const handleResize = (_) => {
      if (heightRef.current !== undefined) {
        const newMaxBodyHeight =
          window.innerHeight - heightRef.current.offsetHeight + 'px'

        if (newMaxBodyHeight !== maxBodyHeight) {
          setMaxBodyHeight(newMaxBodyHeight)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    // Handle first time
    setMaxBodyHeight(window.innerHeight - heightRef.current.offsetHeight + 'px')

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box className={classes.app}>
      {/* Snack bar that floats */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={errorMessage.length !== 0}
        autoHideDuration={timeout}
        onClose={() => setErrorMessage('')}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      {/* Top app bar */}
      <AppBar className={classes.appBar} position="static" ref={heightRef}>
        <Toolbar>
          <StatusChip
            title="SERVER"
            type={connected ? statusChipTypes.OK : statusChipTypes.ERROR}
          />
          <IconButton
            color="inherit"
            onClick={() => setLightTheme(!isLightTheme)}
          >
            {isLightTheme ? <BrightnessHigh /> : <BrightnessLow />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box className={classes.content}>
        <Grid container direction="row" className={classes.grid}>
          <Grid item md={6}>
            <TaskText
              taskName="Move to Waypoint A"
              isComplete={false}
              taskDetail="This is the task description for move to waypoint A. This will appear only if the expand button is clicked."
            />

            <Box
              style={{
                backgroundColor: 'black',
                width: '50%',
                height: '300px',
              }}
            >
              <Odometry width="30%" data={odometryData} />
            </Box>

            <TaskTab
              onTabChange={(index) => setTaskTabIndex(index)}
              value={taskTabIndex}
              tasks={tasksData}
            />

            {image !== '' ? (
              <img
                width={800}
                height={400}
                src={`data:image/png;base64,${image}`}
              />
            ) : null}
          </Grid>
          <Grid item md={6} className={classes.grid}>
            <Box
              style={{
                maxHeight: maxBodyHeight,
                overflowY: 'auto',
              }}
            >
              <AppBar position="static">
                <Tabs
                  value={mainTabIndex}
                  onChange={(_, value) => setMainTabIndex(value)}
                  variant="fullWidth"
                >
                  <Tab label="State" value={mainTabs.STATES} />
                  <Tab label="Tasks" value={mainTabs.TASKS} />
                </Tabs>
              </AppBar>
              <TabContext value={mainTabIndex}>
                <TabPanel value={mainTabs.STATES}>
                  <GeneralHealthState data={generalHealthData} />

                  <SensorsStates data={sensorData} />

                  <MotorStates data={motorData} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default app
