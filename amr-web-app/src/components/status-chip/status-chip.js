import { Chip, makeStyles } from '@material-ui/core'
import React, { useMemo } from 'react'
import getColor from './utils'
import { statusChipTypes } from './const'

// This component is a chip that displays status. The status can be ok, warning, or error.
const statusChip = ({ status, width = '80px', type = statusChipTypes.OK }) => {
  const useStyles = useMemo(
    () =>
      makeStyles({
        background: {
          backgroundColor: getColor(type, false),
          color: '#FFFFFF',
          width: width,
        },
      }),
    [type]
  )

  const classes = useStyles()

  return <Chip label={status} size="small" className={classes.background} />
}

export default React.memo(statusChip)
