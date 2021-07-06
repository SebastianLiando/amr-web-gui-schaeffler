import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import red from '@material-ui/core/colors/red'
import { statusChipTypes } from './const'

/**
 * Returns the color to use for the status chip.
 *
 * @param {String} type 'ok', 'warning', or 'error'. Other values will fallback to 'ok'.
 * @param {boolean} isDarkTheme Whether the current theme is dark theme.
 */
const getColor = (type, isDarkTheme = false) => {
  const number = isDarkTheme ? '200' : '400'

  if (type.toLowerCase() === statusChipTypes.ERROR) {
    return red[number]
  } else if (type.toLowerCase() === statusChipTypes.WARNING) {
    return amber[number]
  } else {
    return green[number]
  }
}

export default getColor
