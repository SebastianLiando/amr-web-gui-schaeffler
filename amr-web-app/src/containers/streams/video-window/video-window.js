import { Typography, Container } from '@material-ui/core'
import { ZoomOutMap } from '@material-ui/icons'

import React, { useRef } from 'react'
import Lottie from 'react-lottie'
import Zoomable from '../zoomable/zoomable'

import noVideoAnimation from '../../../assets/lottie/5884-video-movie.json'

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: noVideoAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

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
        <Container>
          <Lottie options={lottieOptions} width={'30%'}></Lottie>
          <Typography variant="subtitle">Waiting for video...</Typography>
        </Container>
      )}
    </Zoomable>
  )
}

export default React.memo(videoWindow)
