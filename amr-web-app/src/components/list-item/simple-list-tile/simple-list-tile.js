import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
  title: {
    flex: '1 1 auto',
  },
})

const simpleListTile = (props) => {
  const classes = useStyle()

  return (
    <Grid container alignItems="center">
      {props.icon !== undefined ? (
        <Grid item xs={2}>
          <FontAwesomeIcon icon={props.icon} />
        </Grid>
      ) : undefined}
      <Grid item xs={5}>
        <Typography variant="subtitle1" className={classes.title} align="left">
          {props.title}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2" align="left">
          {props.value}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default simpleListTile
