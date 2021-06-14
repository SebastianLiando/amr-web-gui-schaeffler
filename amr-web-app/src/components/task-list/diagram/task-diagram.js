import { Container, makeStyles } from '@material-ui/core'
import React, { useMemo } from 'react'

const taskDiagram = ({ base64Png, maxWidth = '100%', onClick }) => {
  const useStyles = useMemo(
    () =>
      makeStyles({
        image: {
          maxWidth: maxWidth,
          cursor: onClick ? 'pointer' : 'auto',
        },
      }),
    [maxWidth, onClick]
  )

  const classes = useStyles()

  return (
    <Container onClick={onClick}>
      {base64Png ? (
        <img
          src={`data:image/png;base64,${base64Png}`}
          className={classes.image}
          alt="Task Diagram"
        />
      ) : null}
    </Container>
  )
}

export default React.memo(taskDiagram)
