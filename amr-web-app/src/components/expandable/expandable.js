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
import React, { useMemo } from 'react'

/**
 * This widgets simplifies the use of Material-UI accordion component.
 *
 * Props:
 * - width - The maximum width of the component.
 * - height - The maximum height of the component.
 * - title - The title of the accordion.
 * - children - The content of the accordion. This will be shown if the accordion is expanded.
 */
const expandable = ({ width, height, title, children }) => {
  const useStyles = useMemo(
    () =>
      makeStyles({
        expandable: {
          maxWidth: width,
          maxHeight: height,
        },

        children: {
          width: '100%',
        },

        compactVertical: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }),
    [width, height]
  )

  const classes = useStyles()

  return (
    <Accordion className={classes.expandable}>
      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faCaretDown} />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.compactVertical}>
        <Box className={classes.children}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(expandable)
