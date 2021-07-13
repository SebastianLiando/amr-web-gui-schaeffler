import { Box } from '@material-ui/core'
import TaskText from '../text/task-list-text'

import React from 'react'

/**
 * This component displays a list of tasks in a list format. 
 * Each tasks contain `id`, `name`, `completed`, and `description`.
 * 
 * Props:
 * - tasks - an array of tasks data
 *
 * Single task data example: 
 * ```
  * {
*     id: 1,
*     name: "Move to waypoint A",
*     completed: false,
*     description: "The robot should reach waypoint A."
  * }
 * ```
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

export default React.memo(tasksList)
