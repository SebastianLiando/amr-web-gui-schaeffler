import { Box, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import GeneralHealthState from './components/health-state/general-health-state/general-health-state'

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
    width: '100%',
  },
})

const app = () => {
  const classes = useStyles()

  const [expanded, setExpanded] = useState(false)

  return (
    <Box className={classes.app}>
      <GeneralHealthState
        expanded={expanded}
        onExpand={() => setExpanded(!expanded)}
        width="400px"
        data={{
          battery: 95.293847,
          temperature: 37.49873,
          distance: 54.12385,
        }}
      />
    </Box>
  )
}

export default app
