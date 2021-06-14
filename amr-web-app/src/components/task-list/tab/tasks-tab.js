import { Box, Tab, Tabs } from '@material-ui/core'
import { Panorama, List } from '@material-ui/icons'
import { TabContext, TabPanel } from '@material-ui/lab'
import React, { useCallback } from 'react'
import TaskDiagram from '../diagram/task-diagram'
import TasksList from '../list/tasks-list'
import { taskTabs } from './const'

const tasksTab = ({
  base64Png,
  value = taskTabs.LIST,
  onTabChange,
  tasks = [],
  diagramMaxWidth,
  onDiagramClick,
}) => {
  const tabChangeHandler = useCallback(
    (_, tabValue) => {
      onTabChange?.call(onTabChange, tabValue)
    },
    [onTabChange]
  )

  return (
    <Box>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={parseInt(value)}
        onChange={tabChangeHandler}
        variant="fullWidth"
      >
        <Tab icon={<List />} label="List" />
        <Tab icon={<Panorama />} label="Diagram" />
      </Tabs>
      <TabContext value={value.toString()}>
        <TabPanel value={taskTabs.LIST}>
          <TasksList tasks={tasks} />
        </TabPanel>
        <TabPanel value={taskTabs.DIAGRAM}>
          <TaskDiagram
            maxWidth={diagramMaxWidth}
            onClick={onDiagramClick}
            base64Png={base64Png}
          />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default React.memo(tasksTab)
