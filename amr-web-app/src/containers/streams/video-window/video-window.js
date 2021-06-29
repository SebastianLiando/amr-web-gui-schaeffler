import { Typography } from '@material-ui/core'
import { ZoomOutMap } from '@material-ui/icons'

import React, { useRef } from 'react'
import Zoomable from '../zoomable/zoomable'

const videoWindow = ({ srcObject, onIconClick }) => {
  const zoomable = useRef()
  const videoTag = useRef()

  if (videoTag.current && !videoTag.current.srcObject) {
    videoTag.current.srcObject = srcObject
  }

  return (
    <Zoomable ref={zoomable} icon={<ZoomOutMap />} onIconClick={onIconClick}>
      {srcObject ? (
        <video
          autoPlay
          ref={videoTag}
          style={{
            width: '100%',
            objectFit: 'contain',
          }}
        ></video>
      ) : (
        <Typography>Waiting for video...</Typography>
      )}
    </Zoomable>
  )
}

export default React.memo(videoWindow)
