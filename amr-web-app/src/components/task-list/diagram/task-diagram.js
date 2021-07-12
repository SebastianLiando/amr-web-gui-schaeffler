import { Container, makeStyles, Typography } from '@material-ui/core'
import React, { useMemo, Fragment } from 'react'

import Lottie from 'react-lottie'
import noImageAnimation from '../../../assets/lottie/9354-image-viewer-icon-animation.json'

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: noImageAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

/**
 * This component displays the task diagram image. The image format is PNG.
 * 
 * Props:
 * - base64Png - The base 64 string representation of the image.
 * - maxWidth - The maximum width that the component can take
 * - onClick - Event handler for when the component is clicked.
 */
const taskDiagram = ({ base64Png, maxWidth = '100%', onClick }) => {
  const useStyles = useMemo(
    () =>
      makeStyles({
        root: {
          width: '100%',
          textAlign: 'center',
        },
        image: {
          maxWidth: maxWidth,
          cursor: onClick ? 'pointer' : 'auto',
        },
      }),
    [maxWidth, onClick]
  )

  const classes = useStyles()

  return (
    <Container className={classes.root}>
      {base64Png ? (
        <img
          onClick={onClick}
          src={`data:image/png;base64,${base64Png}`}
          className={classes.image}
          alt="Task Diagram"
        />
      ) : (
        <Fragment>
          <Lottie options={lottieOptions} width={100} />
          <Typography variant="h6">Waiting for Image...</Typography>
        </Fragment>
      )}
    </Container>
  )
}

export default React.memo(taskDiagram)
