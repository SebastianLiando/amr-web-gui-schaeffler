import { ZoomOutMap } from '@material-ui/icons'
import Zoomable from '../zoomable/zoomable'

import React from 'react'
import { Typography } from '@material-ui/core'

const camera = ({ onIconClick }) => {
  return (
    <Zoomable icon={<ZoomOutMap />} onIconClick={onIconClick}>
      <Typography>Camera Feed</Typography>
    </Zoomable>
  )
}

export default camera
