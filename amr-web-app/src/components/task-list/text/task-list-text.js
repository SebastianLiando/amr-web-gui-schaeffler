import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core'
import StatusChip from '../../status-chip/status-chip'

import React from 'react'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { statusChipTypes } from '../../status-chip/const'
import { taskStatus } from './const'

const useStyle = makeStyles({
  detailText: {
    marginLeft: '8px',
    marginTop: '2px',
  },
})

/**
 * This component is a single list item for a task.
 * 
 * Props:
 * - taskName - the name of the task
 * - isComplete - `true` if the task has been completed. Otherwise, it is `false`
 * - taskDetail - the detail of the task
 */
const taskListText = ({ taskName, isComplete, taskDetail }) => {
  const classes = useStyle()

  return (
    <Accordion square>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <StatusChip
          status={isComplete ? taskStatus.COMPLETE : taskStatus.IN_PROGRESS}
          type={isComplete ? statusChipTypes.OK : statusChipTypes.WARNING}
          width="110px"
        />
        <Typography variant="body2" className={classes.detailText}>
          {taskName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {taskDetail}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(taskListText)
