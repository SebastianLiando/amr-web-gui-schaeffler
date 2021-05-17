const odometryData = {
  yaw: 65.432123,
  vel_yaw: 4.4234,
  x: 32.353234,
  vel_x: 3.124321,
  acc_x: 3.5123,
  y: 54.33495,
  vel_y: 4.3432,
  acc_y: 1.23123,
}

const motorData = [
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
    details: 'This motor is not working at all! Try restarting the motor.',
  },
]

const sensorData = [
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
    details: 'This sensor is not working at all! Try restarting the sensor.',
  },
]

const generalHealthData = {
  battery: 95.293847,
  temperature: 37.49873,
  distance: 54.12385,
}

const tasksData = [
  {
    id: 1,
    completed: false,
    name: 'Move to waypoint A',
    description: 'The robot should reach waypoint A.',
  },
  {
    id: 2,
    completed: true,
    name: 'Move to waypoint B',
    description: 'The robot should reach waypoint B.',
  },
]

export { odometryData, sensorData, motorData, generalHealthData, tasksData }
