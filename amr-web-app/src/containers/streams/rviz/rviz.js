import { ZoomOutMap } from '@material-ui/icons'
import Zoomable from '../zoomable/zoomable'

import React from 'react'
import { Typography } from '@material-ui/core'

const rviz = ({ onIconClick }) => {
  return (
    <Zoomable icon={<ZoomOutMap />} onIconClick={onIconClick}>
      <Typography>RVIZ</Typography>
    </Zoomable>
  )
}

export default rviz
