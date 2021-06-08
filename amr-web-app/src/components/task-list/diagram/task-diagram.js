import { Container, makeStyles } from '@material-ui/core'
import React, { useMemo } from 'react'

import smachViewer from '../../../assets/images/smach_viewer.png'

const taskDiagram = ({ maxWidth = '100%', onClick }) => {
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
      <img src={smachViewer} className={classes.image} alt="Task Diagram" />
    </Container>
  )
}

export default React.memo(taskDiagram)
