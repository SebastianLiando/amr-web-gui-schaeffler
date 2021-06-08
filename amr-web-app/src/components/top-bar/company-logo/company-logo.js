import { makeStyles, Tooltip } from '@material-ui/core'
import React, { useMemo } from 'react'

import logo from '../../../assets/images/schaeffler-logo.png'

const companyLogo = ({
  width = '200px',
  bgColor = 'white',
  borderRadius = '8px',
  tooltip = 'Schaeffler logo',
}) => {
  const useStyles = useMemo(
    () =>
      makeStyles({
        logo: {
          height: 'auto',
          width: width,
          background: bgColor,
          borderRadius: borderRadius,
        },
      }),
    [width, bgColor, borderRadius]
  )
  const classes = useStyles()

  return (
    <Tooltip title={tooltip}>
      <img src={logo} className={classes.logo} />
    </Tooltip>
  )
}

export default React.memo(companyLogo)
