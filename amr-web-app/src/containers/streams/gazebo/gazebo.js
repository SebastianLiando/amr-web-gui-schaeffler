import { ZoomOutMap } from '@material-ui/icons'
import Zoomable from '../zoomable/zoomable'

import React from 'react'
import { Typography } from '@material-ui/core'

const gazebo = ({ onIconClick }) => {
  return (
    <Zoomable icon={<ZoomOutMap />} onIconClick={onIconClick}>
      <Typography>Gazebo</Typography>
    </Zoomable>
  )
}

export default gazebo
