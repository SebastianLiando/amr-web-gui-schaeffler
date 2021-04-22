import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
  title: {
    flex: '1 1 auto',
  },
})

const simpleListTile = ({icon, title, value}) => {
  const classes = useStyle()

  return (
    <Grid container alignItems="center">
      {icon !== undefined ? (
        <Grid item xs={2}>
          <FontAwesomeIcon icon={icon} />
        </Grid>
      ) : undefined}
      <Grid item xs={5}>
        <Typography variant="subtitle1" className={classes.title} align="left">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2" align="left">
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default simpleListTile
