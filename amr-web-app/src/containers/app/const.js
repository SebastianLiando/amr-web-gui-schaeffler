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

export { mainTabs, zoomableComponent, socketMessage }
