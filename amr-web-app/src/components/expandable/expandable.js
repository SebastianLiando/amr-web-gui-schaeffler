import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'

const expandable = ({ width, height, title, children }) => {
  const useStyles = makeStyles({
    expandable: {
      maxWidth: width,
      maxHeight: height,
    },

    children: {
      width: '100%',
    },
  })

  const classes = useStyles()

  return (
    <Accordion className={classes.expandable}>
      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faCaretDown} />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.children}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default expandable
