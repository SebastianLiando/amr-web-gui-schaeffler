import { Container, Fade, IconButton, makeStyles } from '@material-ui/core'

import React, { useCallback, useState } from 'react'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    padding: 0,
    position: 'relative',
    transition: 'box-shadow 0.3s',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: 'none',
  },

  shadow: {
    boxShadow: '0px -7px 10px inset',
  },

  icon: {
    position: 'absolute',
    right: '2px',
    bottom: '2px',
    color: 'gray',
  },
})

/**
 * This component allow the children components to be enlarged. How the enlargement works
 * should be handled in `onIconClick`.
 * 
 * Props:
 * - icon - the clickable icon that indicates that the children component can be enlarged. This shows up when
 *   the user hovered on this component. On mobile devices, a tap displays this icon.
 * - children - the children components that can be enlarged.
 * - timeout - how many milliseconds it takes to hide the clickable icon if it is displayed because of a user tap.
 * - onIconClick - handler to handle enlargement.
 */
const zoomable = ({ icon, children, timeout = 2000, onIconClick }) => {
  // Whether the icon is displayed to the user
  const [showIcon, setShowIcon] = useState(false)

  const classes = useStyles()

  // When clicked, show the icon for the timeout duration
  const onClickHandler = useCallback(() => {
    setShowIcon(true)

    setTimeout(() => setShowIcon(false), timeout)
  }, [timeout])

  // On hover, show the icon
  const onMouseEnterHandler = useCallback(() => setShowIcon(true), [])

  // When no longer hovering, hide the icon
  const onMouseLeaveHandler = useCallback(() => setShowIcon(false), [])

  const rootClasses = [classes.root]

  if (showIcon) {
    rootClasses.push(classes.shadow)
  }

  return (
    <Container
      className={rootClasses.join(' ')}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={onClickHandler}
    >
      {children}
      <Fade in={showIcon}>
        <IconButton className={classes.icon} onClick={onIconClick}>
          {icon}
        </IconButton>
      </Fade>
    </Container>
  )
}

export default zoomable
