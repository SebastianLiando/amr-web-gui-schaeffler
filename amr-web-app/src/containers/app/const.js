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
  TASK_DIAGRAM: 'task_image',

  WATCHER: 'watcher',
  CLIENT_OFFER: 'client_offer',
  OFFER: 'offer',
  ANSWER: 'answer',
  CANDIDATE: 'candidate',
}

// This web application's configuration
const config = {
  WS_ADDRESS: 'ws://localhost:5500',
  WS_RECONNECT_DELAY: 5000,
}

// WebRTC config
const rtcConfig = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
}

export { mainTabs, zoomableComponent, socketMessage, config, rtcConfig }
