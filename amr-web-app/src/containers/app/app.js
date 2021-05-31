import {
  AppBar,
  Box,
  createMuiTheme,
  CssBaseline,
  Grid,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
} from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'

import { Alert, TabContext, TabPanel } from '@material-ui/lab'

import GeneralHealthState from '../../components/health-state/general-health-state/general-health-state'
import MotorStates from '../../components/health-state/motors-states/motor-states'
import SensorsStates from '../../components/health-state/sensors-states/sensors-states'
import Odometry from '../../components/nav/odometry/odometry'
import TaskTab from '../../components/task-list/tab/tasks-tab'

import {
  generalHealthData as dummyGeneralHealthData,
  motorData,
  odometryData as dummyOdometryData,
  sensorData,
  tasksData,
} from '../../dummy/data'
import { mainTabs, zoomableComponent } from './const'
import CompanyLogo from '../../components/top-bar/company-logo/company-logo'
import ServerIndicator from '../../components/top-bar/server-indicator/server-indicator'
import ThemeToggle from '../../components/top-bar/theme-toggle/theme-toggle'
import { green } from '@material-ui/core/colors'
import RVIZ from '../streams/rviz/rviz'
import Gazebo from '../streams/gazebo/gazebo'
import Camera from '../streams/camera/camera'
import { taskTabs } from '../../components/task-list/tab/const'
import { Fragment } from 'react'

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

  logo: {
    flex: '1 0 auto',
  },

  grid: {
    height: '100%',
  },
})

const app = () => {
  const classes = useStyles()

  // WebSocket server connection state
  const [connected, setConnected] = useState(false)

  // Odometry state
  const [odometryData, setOdometryData] = useState(dummyOdometryData)

  // General health state
  const [generalHealthData, setGeneralHealthData] = useState(
    dummyGeneralHealthData
  )

  // Error message to be displayed in the snack bar
  const [errorMessage, setErrorMessage] = useState('')

  // Currently selected index for the task tab
  const [taskTabIndex, setTaskTabIndex] = useState(taskTabs.LIST)

  // Currently selected index for the main tab
  const [mainTabIndex, setMainTabIndex] = useState(mainTabs.STATES)

  // Light or dark theme state
  const [isLightTheme, setLightTheme] = useState(true)

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': {
            minHeight: '100vh',
            maxHeight: '100vh',
            display: 'flex',
            overflow: 'hidden',
          },
        },
      },
    },
    palette: {
      type: isLightTheme ? 'light' : 'dark',
      primary: green,
    },
  })

  const [maxBodyHeight, setMaxBodyHeight] = useState('100%')

  const [currentZoomed, setCurrentZoomed] = useState(zoomableComponent.NONE)

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
          // setImage(payload.data)
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
    const calculateMaxBodyHeightPx = (window, tabBar) =>
      window.innerHeight - tabBar.offsetHeight - tabBar.offsetTop + 'px'

    // eslint-disable-next-line no-unused-vars
    const handleResize = (_) => {
      if (heightRef.current !== undefined) {
        const newMaxBodyHeight = calculateMaxBodyHeightPx(
          window,
          heightRef.current
        )

        if (newMaxBodyHeight !== maxBodyHeight) {
          setMaxBodyHeight(newMaxBodyHeight)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    // Handle first time
    setMaxBodyHeight(calculateMaxBodyHeightPx(window, heightRef.current))

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let leftBox

  // Returns a function that handles zoom in and zoom out of the video streams on the left side
  const buildZoomHandler = (component) => {
    return () => {
      if (currentZoomed != zoomableComponent.NONE) {
        setCurrentZoomed(zoomableComponent.NONE)
      } else {
        setCurrentZoomed(component)
      }
    }
  }

  const rvizComponent = (
    <RVIZ onIconClick={buildZoomHandler(zoomableComponent.RVIZ)} />
  )

  const gazeboComponent = (
    <Gazebo onIconClick={buildZoomHandler(zoomableComponent.GAZEBO)} />
  )

  const cameraComponent = (
    <Camera onIconClick={buildZoomHandler(zoomableComponent.CAMERA)} />
  )

  switch (currentZoomed) {
    case zoomableComponent.NONE:
      leftBox = (
        <Fragment>
          <Grid item xs container direction="row">
            <Grid item xs sm>
              {rvizComponent}
            </Grid>
            <Grid item xs={12} sm>
              {gazeboComponent}
            </Grid>
          </Grid>

          <Grid item xs container direction="row">
            <Grid item xs={12} sm>
              {cameraComponent}
            </Grid>
            <Grid item xs={12} sm align="center" style={{ margin: 'auto' }}>
              <Odometry width="100%" data={odometryData} opacity="100%" />
            </Grid>
          </Grid>
        </Fragment>
      )
      break

    case zoomableComponent.RVIZ:
      leftBox = rvizComponent
      break

    case zoomableComponent.GAZEBO:
      leftBox = gazeboComponent
      break

    case zoomableComponent.CAMERA:
      leftBox = cameraComponent
      break
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Box className={classes.logo}>
              <CompanyLogo />
            </Box>
            <ServerIndicator connected={connected} />
            <ThemeToggle
              lightTheme={isLightTheme}
              onToggle={(result) => setLightTheme(result)}
            />
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box className={classes.content}>
          <Grid container direction="row" className={classes.grid}>
            {/* Left Box */}
            <Grid item xs={12} lg={7} container direction="column">
              {leftBox}
            </Grid>

            {/* Right Box */}
            <Grid item xs={12} lg={5} className={classes.grid}>
              <Box>
                <AppBar position="static" ref={heightRef}>
                  <Tabs
                    value={parseInt(mainTabIndex)}
                    onChange={(_, value) => setMainTabIndex(value)}
                    variant="fullWidth"
                  >
                    <Tab label="State" />
                    <Tab label="Tasks" />
                  </Tabs>
                </AppBar>
                <TabContext value={mainTabIndex.toString()}>
                  <TabPanel
                    value={mainTabs.STATES}
                    style={{
                      maxHeight: maxBodyHeight,
                      overflowY: 'auto',
                    }}
                  >
                    <GeneralHealthState data={generalHealthData} />

                    <SensorsStates data={sensorData} />

                    <MotorStates data={motorData} />
                  </TabPanel>
                  <TabPanel
                    value={mainTabs.TASKS}
                    style={{
                      maxHeight: maxBodyHeight,
                      overflowY: 'auto',
                    }}
                  >
                    <TaskTab
                      onTabChange={(index) => setTaskTabIndex(index)}
                      value={taskTabIndex}
                      tasks={tasksData}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default app
