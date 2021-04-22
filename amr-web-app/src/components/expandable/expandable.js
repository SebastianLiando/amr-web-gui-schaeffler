import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
  Box,
  Button,
  Collapse,
  duration,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'

const expandable = ({width, height, expanded, onExpand, title, children}) => {
  const useStyles = makeStyles({
    expandable: {
      width: width,
      height: height,
    },

    typography: {
      flex: '1 0 auto',
      textAlign: 'start',
    },

    expandIcon: {
      transform: 'rotate(180deg)',
      transition: `transform ${duration.standard}ms linear`,
    },

    expandIconExpanded: {
      transform: 'rotate(0deg)',
    },

    children: {
      padding: '16px',
    },
  })

  const classes = useStyles()

  const iconClasses = (expanded
    ? [classes.expandIcon]
    : [classes.expandIcon, classes.expandIconExpanded]
  ).join(' ')

  return (
    <Paper className={classes.expandable}>
      <Button fullWidth onClick={onExpand}>
        <Typography variant="h6" className={classes.typography}>
          {title}
        </Typography>
        <FontAwesomeIcon icon={faCaretDown} className={iconClasses} size="lg" />
      </Button>
      <Collapse in={expanded}>
        <Box className={classes.children}>{children}</Box>
      </Collapse>
    </Paper>
  )
}

export default expandable
