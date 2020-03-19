import React from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { saveCurrentFilm } from '../redux/actions';
import { getUrl } from '../../utils/index';
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

  const { film } = useSelector(state => ({ //вместо mapStateToProps
    film: state.films[props.index],
  }));

  const dispatch = useDispatch(); //вместо mapDispatchToProps

  return (
    <Card className={classes.root}>
      <CardContent className={classes.inner}>
        <Typography className={classes.suptitle} color="textSecondary" gutterBottom>
          Episod {props.about.episode_id}
        </Typography>
        <Typography className={classes.title} variant="h4" component="span">
          {props.about.title}
        </Typography>
        <Typography className={classes.suptitle} color="textSecondary" gutterBottom>
          Release Data {props.about.release_date}
        </Typography>
      </CardContent>
      <CardActions>
        <button className="href" onClick={() => {
          props.history.push('/films/' + getUrl(props.about.url))
          dispatch(saveCurrentFilm(film))
        }} size="small">Read More</button>
      </CardActions>
    </Card>
  );
}

export default withRouter(Main);