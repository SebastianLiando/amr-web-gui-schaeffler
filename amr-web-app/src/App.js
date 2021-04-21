import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import './App.css'

import Expandable from './components/expandable/expandable'

const app = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="App">
      <Expandable
        width="500px"
        height="auto"
        title="Expand Me!"
        expanded={expanded}
        onExpand={() => setExpanded(!expanded)}
      >
        <Typography>
          This is a very long description sentence. This is a very long
          description sentence. This is a very long description sentence. This
          is a very long description sentence. This is a very long description
          sentence. This is a very long description sentence. This is a very
          long description sentence.
        </Typography>
      </Expandable>
    </div>
  )
}

export default app
