import {
  Box,
  Button,
  Collapse,
  duration,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ExpandLess } from '@material-ui/icons'
import React from 'react'

const expandable = (props) => {
  const useStyles = makeStyles({
    expandable: {
      width: props.width,
      height: props.height,
    },

    typography: {
      flex: '1 0 auto',
      textAlign: 'start',
    },

    expandIcon: {
      transform: 'rotate(0deg)',
      transition: `transform ${duration.standard}ms linear`,
    },

    expandIconExpanded: {
      transform: 'rotate(180deg)',
    },

    children: {
      padding: '16px',
    },
  })

  const classes = useStyles()

  const iconClasses = (props.expanded
    ? [classes.expandIcon]
    : [classes.expandIcon, classes.expandIconExpanded]
  ).join(' ')

  return (
    <Paper className={classes.expandable}>
      <Button fullWidth onClick={props.onExpand}>
        <Typography variant="h6" className={classes.typography}>
          {props.title}
        </Typography>
        <ExpandLess className={iconClasses} />
      </Button>
      <Collapse in={props.expanded}>
        <Box className={classes.children}>{props.children}</Box>
      </Collapse>
    </Paper>
  )
}

export default expandable
