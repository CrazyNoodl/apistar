import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import s from './Film.module.scss';
import Planets from '../Planets/Planets';
import { saveCurrentFilm } from '../redux/actions';
import { API } from '../../constants/api';
import Starships from '../Starships/Starships';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

function Film(props) {

  const [loading, setLodaing] = useState(props.film === null)
  // const [poster, setPoster] = useState(null) //*
  const [starships, setStarships] = useState(false)
  const [planets, setPlanets] = useState(false)


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API}${props.location.pathname}`);
        const data = await response.json();
        // const urlPoster = `https://api.themoviedb.org/3/search/movie?api_key=0ee32771ac12a2b0b6c306f4f382cdf3&query=${data.title}`; // *
        // const reqPoster = await fetch(urlPoster); //*
        // const dataPoster = await reqPoster.json(); //*
        props.saveCurrentFilm(data);
        // setPoster(dataPoster.results[0].poster_path); //*
        setLodaing(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (!props.film) {
      fetchData();
    }

  }, []);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <div className="spinner">
          <CircularProgress color="secondary" size={200} />
        </div>
      ) : (

          <Box display="flex" className={s.root}>
            {/* <div className={s.imgwrapper}>
              <img className={s.img} src={`https://image.tmdb.org/t/p/w500${poster}`} alt={props.film.title} />
            </div> */}

            <div className={s.left}>
              <h1>{props.film.title}</h1>
              <h2>Episod {props.film.episode_id}, Release Date: {props.film.release_date}</h2>
              <p className="text" >{props.film.opening_crawl}</p>
              <h3>Director: {props.film.director}</h3>
              <h3>Producer: {props.film.producer}</h3>
              <div className={s.buttons}>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={() => setPlanets(!planets)}
                >
                  Planets
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={() => setStarships(true)}
                  disabled={starships}
                >
                  Starships
              </Button>
              </div>
              <div className={s.bottom}>
                {planets ? <Planets /> : null}
                {starships ? <Starships /> : null}
              </div>
            </div>
          </Box>
        )
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    film: state.currentFilm,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveCurrentFilm: (data) => dispatch(saveCurrentFilm(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Film);