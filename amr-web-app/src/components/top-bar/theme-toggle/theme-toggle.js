import { IconButton, Tooltip } from '@material-ui/core'
import { BrightnessHigh, BrightnessLow } from '@material-ui/icons'
import React from 'react'

/**
 * This component is a toggle that switches the app theme between light theme and dark theme. It is 
 * displayed as an icon. This icon is determined by `iconLight` and `iconDark` props.
 * 
 * Props:
 * - lightTheme - `true` if the app is currently in light theme
 * - iconLight - the icon component to display when the app is in light theme.
 * - iconDark - the icon component to display when the app is in dark theme.
 * - onToggle - handler when the user toggles the button. It receives 1 boolean argument: whether the 
 *   app should be in light theme.
 * - tooltipLight - the tooltip text when the app is in light theme.
 * - tooltipDark - the tooltip text when the app is in dark theme.
 */
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

export default React.memo(themeToggle)
