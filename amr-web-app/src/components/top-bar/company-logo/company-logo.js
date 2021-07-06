import { makeStyles, Tooltip } from '@material-ui/core'
import React, { useMemo } from 'react'

import schaefflerLogo from '../../../assets/images/schaeffler-logo.png'

// A component that displays the company logo.
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
      <img src={schaefflerLogo} className={classes.logo} />
    </Tooltip>
  )
}

export default React.memo(companyLogo)
