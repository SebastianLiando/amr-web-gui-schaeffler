import { Box, makeStyles, Tab, Tabs } from '@material-ui/core'
import { Panorama, List } from '@material-ui/icons'
import React, { useCallback } from 'react'
import TabPanel from '../../tabs/panel/tabs-panel'
import TasksList from '../list/tasks-list'
import { taskTabs } from './const'

const useStyles = makeStyles({
  tabBody: {
    padding: '16px 0px',
  },
})

const tasksTab = ({ value = 0, onTabChange, tasks = [] }) => {
  const classes = useStyles()

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
      <Box className={classes.tabBody}>
        <TabPanel currentValue={value} activeValue={taskTabs.LIST}>
          <TasksList tasks={tasks} />
        </TabPanel>
        <TabPanel currentValue={value} activeValue={taskTabs.DIAGRAM}>
          Tab 2
        </TabPanel>
      </Box>
    </Box>
  )
}

export default tasksTab
