import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { NavigationRounded } from '@material-ui/icons'
import React, { useMemo } from 'react'

/*
    Units
    yaw - degree
    vel_yaw - degree / s
    vel_x = m / s
    acc_x = m / s^2
    vel_y = m / s
    acc_y = m / s^2

    Data example:
    data = {
        yaw
        vel_yaw
        x
        vel_x
        acc_x
        y
        vel_y
        acc_y
    }

*/
const odometry = ({ data, width, opacity = '85%' }) => {
  const rotation = useMemo(() => `${data?.yaw ?? 0}deg`, [data])

  const useStyles = useMemo(
    () =>
      makeStyles({
        root: {
          width: width,
          minWidth: '230px',
          maxWidth: '400px',
          opacity: opacity,
          borderRadius: '8px',
        },
        padded: {
          padding: '4px 8px',
        },
        navIcon: {
          fontSize: '70px',
          transform: `rotate(${rotation})`,
        },
      }),
    [width, opacity, rotation]
  )

  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.red} align="center">
          <NavigationRounded className={classes.navIcon} color="primary" />
        </Grid>

        <Grid item container xs={6} className={classes.padded}>
          <Grid item xs={6}>
            <Typography variant="body2">Yaw</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.yaw?.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">VelYaw</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">
              {data?.vel_yaw?.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={6} className={classes.padded}>
          <Grid item xs={6}>
            <Typography variant="body2">X</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.x?.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">VelX</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.vel_x?.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">AccX</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.acc_x?.toFixed(2)}</Typography>
          </Grid>
        </Grid>

        <Grid item container xs={6} className={classes.padded}>
          <Grid item xs={6}>
            <Typography variant="body2">Y</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.y?.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">VelY</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.vel_y?.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">AccY</Typography>
          </Grid>
          <Grid item xs={6} align="center | left">
            <Typography variant="caption">{data?.acc_y?.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default React.memo(odometry)
