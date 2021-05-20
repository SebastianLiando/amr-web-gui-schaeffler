import { IconButton, Tooltip } from '@material-ui/core'
import { BrightnessHigh, BrightnessLow } from '@material-ui/icons'
import React from 'react'

const themeToggle = ({
  lightTheme = true,
  iconLight = <BrightnessHigh />,
  iconDark = <BrightnessLow />,
  onToggle,
  tooltipLight = 'Switch to dark theme',
  tooltipDark = 'Switch to light theme',
}) => {
  return (
    <Tooltip title={lightTheme ? tooltipLight : tooltipDark}>
      <IconButton color="inherit" onClick={() => onToggle(!lightTheme)}>
        {lightTheme ? iconLight : iconDark}
      </IconButton>
    </Tooltip>
  )
}

export default themeToggle
