import {
  AppBar,
  Box,
  Button,
  Container,
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  useCallback,
  useMemo,
} from 'react'

import { Alert, TabContext, TabPanel } from '@material-ui/lab'

import GeneralHealthState from '../../components/health-state/general-health-state/general-health-state'
import MotorStates from '../../components/health-state/motors-states/motor-states'
import SensorsStates from '../../components/health-state/sensors-states/sensors-states'
import Odometry from '../../components/nav/odometry/odometry'
import TaskTab from '../../components/task-list/tab/tasks-tab'

import { mainTabs, zoomableComponent, socketMessage, config } from './const'
import CompanyLogo from '../../components/top-bar/company-logo/company-logo'
import ServerIndicator from '../../components/top-bar/server-indicator/server-indicator'
import ThemeToggle from '../../components/top-bar/theme-toggle/theme-toggle'
import { green } from '@material-ui/core/colors'
import RVIZ from '../streams/rviz/rviz'
import Gazebo from '../streams/gazebo/gazebo'
import Camera from '../streams/camera/camera'
import { taskTabs } from '../../components/task-list/tab/const'

import { io } from 'socket.io-client'
import TaskDiagram from '../../components/task-list/diagram/task-diagram'

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
  const [odometryData, setOdometryData] = useState()

  // General health state
  const [generalHealthData, setGeneralHealthData] = useState()

  const [motorData, setMotorData] = useState()

  const [sensorData, setSensorData] = useState()

  const [tasksData, setTasksData] = useState()

  // Error message to be displayed in the snack bar
  const [errorMessage, setErrorMessage] = useState('')

  // Currently selected index for the task tab
  const [taskTabIndex, setTaskTabIndex] = useState(taskTabs.LIST)

  // Currently selected index for the main tab
  const [mainTabIndex, setMainTabIndex] = useState(mainTabs.STATES)

  // Light or dark theme state
  const [isLightTheme, setLightTheme] = useState(true)

  // Is the full width dialog open
  const [isDialogOpen, setDialogOpen] = useState(false)

  const theme = useMemo(
    () =>
      createMuiTheme({
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
      }),
    [isLightTheme]
  )

  const [maxBodyHeight, setMaxBodyHeight] = useState('100%')

  const [currentZoomed, setCurrentZoomed] = useState(zoomableComponent.NONE)

  const heightRef = useRef()

  // Reference to the right grid
  const rightBoxRef = useRef()

  const [taskDiagramMaxWidth, setTaskDiagramMaxWidth] = useState('100%')

  const reconnectionMs = config.WS_RECONNECT_DELAY

  const connectToWebSocket = useCallback(() => {
    const socket = io(config.WS_ADDRESS, {
      reconnectionDelay: reconnectionMs,
    })

    socket.on('connect', () => {
      setErrorMessage('')
      setConnected(true)
      console.log('Connected to websocket')
    })

    socket.on('connect_error', () => {
      setConnected(false)
      const message =
        'Disconnected from websocket, reconnecting after ' +
        reconnectionMs / 1000 +
        ' seconds'

      setErrorMessage(message)
    })

    socket.on(socketMessage.GENERAL_HEALTH, (data) =>
      setGeneralHealthData(data)
    )

    socket.on(socketMessage.ODOMETRY, (data) => setOdometryData(data))

    socket.on(socketMessage.SENSORS, (data) => setSensorData(data))

    socket.on(socketMessage.MOTORS, (data) => setMotorData(data))

    socket.on(socketMessage.TASKS, (data) => setTasksData(data))
  }, [setConnected, setErrorMessage])

  // componentDidMount()
  useEffect(() => {
    // Connect to web socket server
    connectToWebSocket()

    // Handle the max height for the right box
    const calculateMaxBodyHeightPx = (window, tabBar) =>
      window.innerHeight - tabBar.offsetHeight - tabBar.offsetTop + 'px'

    // eslint-disable-next-line no-unused-vars
    const handleResize = (_) => {
      // Right box vertical scrolling
      if (heightRef.current !== undefined) {
        const newMaxBodyHeight = calculateMaxBodyHeightPx(
          window,
          heightRef.current
        )

        if (newMaxBodyHeight !== maxBodyHeight) {
          setMaxBodyHeight(newMaxBodyHeight)
        }
      }

      // Task diagram maximum width
      if (rightBoxRef.current !== undefined) {
        const width = rightBoxRef.current.offsetWidth * 0.8 + 'px'

        if (width !== taskDiagramMaxWidth) {
          setTaskDiagramMaxWidth(width)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    // Handle first time load
    handleResize('')

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let leftBox

  // Returns a function that handles zoom in and zoom out of the video streams on the left side
  const buildZoomHandler = useCallback(
    (component) => {
      return () => {
        if (currentZoomed != zoomableComponent.NONE) {
          setCurrentZoomed(zoomableComponent.NONE)
        } else {
          setCurrentZoomed(component)
        }
      }
    },
    [currentZoomed]
  )

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

  const closeDialog = useCallback(() => setDialogOpen(false), [setDialogOpen])

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
          autoHideDuration={reconnectionMs}
          onClose={() => setErrorMessage('')}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>

        {/* Dialog */}
        <Dialog
          open={isDialogOpen}
          fullWidth
          maxWidth={false}
          onClose={closeDialog}
        >
          <DialogContent>
            <TaskDiagram />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={closeDialog}>
              <Typography>Close</Typography>
            </Button>
          </DialogActions>
        </Dialog>

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
            <Grid
              item
              xs={12}
              lg={5}
              className={classes.grid}
              ref={rightBoxRef}
            >
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
                    <Container>
                      <TaskTab
                        onTabChange={(index) => setTaskTabIndex(index)}
                        value={taskTabIndex}
                        tasks={tasksData}
                        diagramMaxWidth={taskDiagramMaxWidth}
                        onDiagramClick={() => setDialogOpen(true)}
                      />
                    </Container>
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
