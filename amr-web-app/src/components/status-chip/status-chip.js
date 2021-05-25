import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'
import getColor from './utils'
import { statusChipTypes } from './const'

const statusChip = ({ status, width = '80px', type = statusChipTypes.OK }) => {
  const useStyles = makeStyles({
    background: {
      backgroundColor: getColor(type, false),
      color: '#FFFFFF',
      width: width,
    },
  })

  const classes = useStyles()

  return <Chip label={status} size="small" className={classes.background} />
}

export default statusChip
