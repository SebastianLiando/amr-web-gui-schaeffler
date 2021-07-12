import { Box, Tab, Tabs } from '@material-ui/core'
import { Panorama, List } from '@material-ui/icons'
import { TabContext, TabPanel } from '@material-ui/lab'
import React, { useCallback } from 'react'
import TaskDiagram from '../diagram/task-diagram'
import TasksList from '../list/tasks-list'
import { taskTabs } from './const'
 
/**
 * This component displays a tab to display the tasks in a list or in a diagram. This component
 * depends on the `TasksList` and `TaskDiagram` component.
 * 
 * Props:
 * - base64Png - Base 64 string representation of the task diagram PNG image.
 * - value - The currently selected tab
 * - onTabChange - Use this handler to change the currently selected tab. This handler will receive
 *   the new task value
 * - tasks - An array of task data
 * - diagramMaxWidth - maximum width of the task diagram.
 * - onDiagramClick - click event handler for when the diagram is clicked.
 */
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
