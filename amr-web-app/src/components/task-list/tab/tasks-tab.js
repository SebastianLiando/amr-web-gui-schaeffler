import { Box, Tab, Tabs } from '@material-ui/core'
import { Panorama, List } from '@material-ui/icons'
import { TabContext, TabPanel } from '@material-ui/lab'
import React, { useCallback } from 'react'
import TaskDiagram from '../diagram/task-diagram'
import TasksList from '../list/tasks-list'
import { taskTabs } from './const'

const tasksTab = ({ value = 0, onTabChange, tasks = [] }) => {
  const tabChangeHandler = useCallback(
    (_, index) => {
      onTabChange?.call(onTabChange, index)
    },
    [onTabChange]
  )

  return (
    <Box>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={tabChangeHandler}
        variant="fullWidth"
      >
        <Tab icon={<List />} label="List" />
        <Tab icon={<Panorama />} label="Diagram" />
      </Tabs>
      <TabContext value={value}>
        <TabPanel value={taskTabs.LIST}>
          <TasksList tasks={tasks} />
        </TabPanel>
        <TabPanel value={taskTabs.DIAGRAM}>
          <TaskDiagram />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default tasksTab
