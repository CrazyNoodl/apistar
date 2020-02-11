import { withRouter } from 'react-router-dom'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Main.scss'

const useStyles = makeStyles({
  root: {
    width: '32%',
    marginBottom: 20,
    backgroundColor: 'transparent',
    border: '3px solid white',
    color: 'white',
    backdropFilter: 'blur(3px)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 200,
    minWidth: 250,
    flexGrow: 1,
    marginRight: 10,
  },
  suptitle: {
    fontSize: 14,
    color: 'white',
    cursor: 'default',
  },
  title: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 900,
    fontSize: 25,
    cursor: 'default',
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  pos: {
    marginBottom: 12,
  },
});

function Main(props) {
  const classes = useStyles();

  const getUrl = (url) => {
    url = url.split('/');
    return url[url.length - 2];
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.inner}>
        <Typography className={classes.suptitle} color="textSecondary" gutterBottom>
          Episod {props.about.episode_id}
        </Typography>
        <Typography className={classes.title} variant="h4" component="span">
          {props.about.title}
        </Typography>
      </CardContent>
      <CardActions>
        <button className="href" onClick={() => props.history.push('/films/' + getUrl(props.about.url))} size="small">Read More</button>
      </CardActions>
    </Card>
  );
}

export default withRouter(Main);