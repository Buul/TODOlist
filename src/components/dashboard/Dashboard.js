import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const Dashboard = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root} elevation={4}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6} md={10}>
          <Typography variant="headline" component="h3">
            Dashboard
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Dashboard);
