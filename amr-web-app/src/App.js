import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import './App.css'

import Expandable from './components/expandable/expandable'
import SimpleListTile from './components/list-item/simple-list-tile/simple-list-tile'

import { faBatteryFull } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
  box: {
    width: '300px',
  },
})

const app = () => {
  const classes = useStyles()
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

      <Box className={classes.box}>
        <SimpleListTile icon={faBatteryFull} title="Battery" value="90%" />
      </Box>
    </div>
  )
}

export default app
