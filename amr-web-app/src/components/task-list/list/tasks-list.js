import { Box } from '@material-ui/core'
import TaskText from '../text/task-list-text'

import React from 'react'

/**
 * Displays a list of tasks in a list format.
 *
 * Example data for the task: {
 *     id: 1,
 *      name: "Move to waypoint A",
 *      completed: false,
 *      description: "The robot should reach waypoint A."
 * }
 *
 * @param {*} tasks An array of tasks.
 */
const tasksList = ({ tasks = [] }) => {
  return (
    <Box>
      {tasks.map(({ id, name, description, completed }) => (
        <TaskText
          key={id}
          taskName={name}
          taskDetail={description}
          isComplete={completed}
        />
      ))}
    </Box>
  )
}

export default tasksList
