import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import red from '@material-ui/core/colors/red'

/**
 * Returns the color to use for the status chip.
 *
 * @param {String} type 'ok', 'warning', or 'error'
 * @param {boolean} isDarkTheme Whether the current theme is dark theme.
 */
const getColor = (type, isDarkTheme = false) => {
  const number = isDarkTheme ? '200' : '400'

  if (type.toLowerCase() === 'error') {
    return red[number]
  } else if (type.toLowerCase() === 'warning') {
    return amber[number]
  } else {
    return green[number]
  }
}

export default getColor
