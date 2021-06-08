const mainTabs = {
  STATES: '0',
  TASKS: '1',
}

const zoomableComponent = {
  NONE: 'None',
  RVIZ: 'RVIZ',
  GAZEBO: 'Gazebo',
  CAMERA: 'Camera',
}

// Contains socket message type strings.
const socketMessage = {
  GENERAL_HEALTH: 'general_state',
  SENSORS: 'sensors',
  MOTORS: 'motors',

  ODOMETRY: 'odometry',

  TASKS: 'tasks',
}

// This web application's configuration
const config = {
  WS_ADDRESS: 'ws://localhost:5500',
  WS_RECONNECT_DELAY: 5000,
}

export { mainTabs, zoomableComponent, socketMessage, config }
