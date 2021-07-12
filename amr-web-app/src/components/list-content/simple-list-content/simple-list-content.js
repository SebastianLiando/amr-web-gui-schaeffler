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

// 
/**
 * This component displays a list of items. Each list item has an icon, title, and value.
 * The icon must be from the FontAwesome icon. This component is used in general health states.
 * 
 * Props:
 * - data - an array of list item data
 */
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

export default React.memo(simpleListContent)
