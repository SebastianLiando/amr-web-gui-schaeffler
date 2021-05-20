import { makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'

import logo from '../../../assets/images/schaeffler-logo.png'

const companyLogo = ({
  width = '200px',
  bgColor = 'white',
  borderRadius = '8px',
  tooltip = 'Schaeffler logo',
}) => {
  const classes = makeStyles({
    logo: {
      height: 'auto',
      width: width,
      background: bgColor,
      borderRadius: borderRadius,
    },
  })()

  return (
    <Tooltip title={tooltip}>
      <img src={logo} className={classes.logo} />
    </Tooltip>
  )
}

export default companyLogo
