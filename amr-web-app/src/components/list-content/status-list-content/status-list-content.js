import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import React from 'react'

import StatusChip from '../../status-chip/status-chip'

const useStyles = makeStyles({
  padded: {
    padding: '0px 8px',
  },
})

/*
Data example

  data: [
    {
      id: 'a',
      name: 'Sensor A',
      status: 'ok',
      details: 'This sensor is working properly.',
    },
    {
      id: 'b',
      name: 'Sensor B',
      status: 'warning',
      details:
        'This sensor is working, but there is an indication of overheating.',
    },
  ]

  status -> ok, warning, or error
*/
const statusListContent = ({ data }) => {
  const classes = useStyles()

  return (
    <List>
      {data !== undefined
        ? data.map(({ id, name, details, status }) => {
            return (
              <ListItem key={id}>
                <ListItemAvatar>
                  <StatusChip type={status} status={status.toUpperCase()} />
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={details}
                  className={classes.padded}
                />
              </ListItem>
            )
          })
        : undefined}
    </List>
  )
}

export default statusListContent
