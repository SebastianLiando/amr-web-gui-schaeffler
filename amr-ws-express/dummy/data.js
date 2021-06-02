const getRandomBetween = (min, max) => {
  return min + Math.random() * (max - min);
};

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

const getOdometryData = () => {
  odometryData.yaw += getRandomBetween(1, 5);

  if (odometryData.yaw >= 360) {
    odometryData.yaw -= 360;
  }

  return {
    ...odometryData,
  };
};

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

const robotHealthState = {
  battery: 100,
  temperature: 40,
  distance: 0,
};

const getRobotHealthState = () => {
  robotHealthState.distance += getRandomBetween(1, 5);

  robotHealthState.temperature = getRandomBetween(38, 42);

  robotHealthState.battery -= getRandomBetween(0, 0.1);

  return {
    ...robotHealthState,
  };
};

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
