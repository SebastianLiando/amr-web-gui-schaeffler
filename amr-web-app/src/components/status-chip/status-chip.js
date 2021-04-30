import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'
import getColor from './utils'

const statusGood = ({ title, width = '90px', type = 'ok' }) => {
  const useStyles = makeStyles({
    background: {
      backgroundColor: getColor(type, false),
      color: '#FFFFFF',
      width: width,
    },
  })

  const classes = useStyles()

  return (
    <Chip
      label={title}
      size="small"
      className={classes.background}
    />
  )
}

export default statusGood
