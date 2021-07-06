/**
 * This file contains constant dummy data or functions used to generate dummy data.
 */

/**
 * Returns a random number in the given range
 * @param {*} min The minimal value.
 * @param {*} max The maximum value.
 * @returns A random number in the range.
 */
const getRandomBetween = (min, max) => {
  return min + Math.random() * (max - min);
};

// Initial odometry data
const odometryData = {
  yaw: 65.432123,
  vel_yaw: 4.4234,
  x: 32.353234,
  vel_x: 3.124321,
  acc_x: 3.5123,
  y: 54.33495,
  vel_y: 4.3432,
  acc_y: 1.23123,
};

/**
 * Returns odometry data. Each call to the function changes the rotation.
 * @returns Odometry data.
 */
const getOdometryData = () => {
  // Increase the yaw randomly from 1 to 5 points.
  odometryData.yaw += getRandomBetween(1, 5);

  // Ensure that yaw is clamped between 0 and 360
  if (odometryData.yaw >= 360) {
    odometryData.yaw -= 360;
  }

  return {
    ...odometryData,
  };
};

// Motor states
const motorData = [
  {
    id: "a",
    name: "Motor A",
    status: "ok",
    details: "This motor is working properly.",
  },
  {
    id: "b",
    name: "Motor B",
    status: "warning",
    details:
      "This motor is working, but there is an indication of overheating.",
  },
  {
    id: "c",
    name: "Motor C",
    status: "error",
    details: "This motor is not working at all! Try restarting the motor.",
  },
];

// Sensor states
const sensorData = [
  {
    id: "a",
    name: "Sensor A",
    status: "ok",
    details: "This sensor is working properly.",
  },
  {
    id: "b",
    name: "Sensor B",
    status: "warning",
    details:
      "This sensor is working, but there is an indication of overheating.",
  },
  {
    id: "c",
    name: "Sensor C",
    status: "error",
    details: "This sensor is not working at all! Try restarting the sensor.",
  },
];

// Initial general health state.
const robotHealthState = {
  battery: 100,
  temperature: 40,
  distance: 0,
};

/**
 * Returns the general health state. Each call increases the distance, randomizes the temperature,
 * and decreases the battery.
 * @returns General health state.
 */
const getRobotHealthState = () => {
  // Increase the distance 
  robotHealthState.distance += getRandomBetween(1, 5);

  // Randomize the temperature
  robotHealthState.temperature = getRandomBetween(38, 42);

  // Reduce battery. Ensure that it is not lower than zero.
  robotHealthState.battery -= getRandomBetween(0, 0.1);
  if (robotHealthState.battery < 0) {
    robotHealthState.battery = 0.1;
  }

  return {
    ...robotHealthState,
  };
};

// Tasks list
const tasksData = [
  {
    id: 1,
    completed: false,
    name: "Move to waypoint A",
    description: "The robot should reach waypoint A.",
  },
  {
    id: 2,
    completed: true,
    name: "Move to waypoint B",
    description: "The robot should reach waypoint B.",
  },
  {
    id: 3,
    completed: false,
    name: "Move to waypoint A",
    description: "The robot should reach waypoint A.",
  },
  {
    id: 4,
    completed: true,
    name: "Move to waypoint B",
    description: "The robot should reach waypoint B.",
  },
  {
    id: 5,
    completed: false,
    name: "Move to waypoint A",
    description: "The robot should reach waypoint A.",
  },
  {
    id: 6,
    completed: true,
    name: "Move to waypoint B",
    description: "The robot should reach waypoint B.",
  },
];

module.exports = {
  getOdometryData,
  sensorData,
  motorData,
  getRobotHealthState,
  tasksData,
};
