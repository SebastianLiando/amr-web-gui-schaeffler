import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core'
import React from 'react'

const simpleListContent = ({ data }) => {
  return (
    <List>
      {data !== undefined
        ? data.map(({ icon, title, value }) => {
            return (
              <ListItem key={title}>
                <ListItemAvatar>
                  <FontAwesomeIcon icon={icon} />
                </ListItemAvatar>
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <Typography variant="caption">{value}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        : undefined}
    </List>
  )
}

export default simpleListContent
