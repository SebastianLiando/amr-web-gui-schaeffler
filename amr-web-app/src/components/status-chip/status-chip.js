import { Chip, makeStyles } from '@material-ui/core'
import React, { useMemo } from 'react'
import getColor from './utils'
import { statusChipTypes } from './const'

/**
 * This chip component is used to display status conditions. The status can be ok, warning, or error.
 * 
 * Props:
 * - status - The status condition text
 * - width - The width of the chip
 * - type - The status condition type. Import `statusChipTypes` to show the available types.
 */
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
