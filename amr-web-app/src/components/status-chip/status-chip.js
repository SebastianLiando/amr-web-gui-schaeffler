import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'
import getColor from './utils'
import { statusChipTypes } from './const'

const statusGood = ({ title, width = '80px', type = statusChipTypes.OK }) => {
  const useStyles = makeStyles({
    background: {
      backgroundColor: getColor(type, false),
      color: '#FFFFFF',
      width: width,
    },
  })

  const classes = useStyles()

  return <Chip label={title} size="small" className={classes.background} />
}

export default statusGood
