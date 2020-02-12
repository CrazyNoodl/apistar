import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import s from './Film.module.scss';
import Planets from '../Planets/Planets';
import Starships from '../Starships/Starships';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

function Film(props) {
  const [film, setFilm] = useState(null)
  const [loading, setLodaing] = useState(true)
  const [poster, setPoster] = useState(null)
  const [starships, setStarships] = useState(false)
  const [planets, setPlanets] = useState(false)


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://swapi.co/api${props.location.pathname}`);
        const data = await res.json();
        const urlPoster = `https://api.themoviedb.org/3/search/movie?api_key=0ee32771ac12a2b0b6c306f4f382cdf3&query=${data.title}`;
        const reqPoster = await fetch(urlPoster);
        const dataPoster = await reqPoster.json();

        setFilm(data);
        setPoster(dataPoster.results[0].poster_path);
        setLodaing(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [props]);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <>
      {loading || !film ? (
        <div className="spinner">
          <CircularProgress color="secondary" size={200} />
        </div>
      ) : (
          <Box display="flex" className={s.root}>
            <div className={s.imgwrapper}>
              <img className={s.img} src={`https://image.tmdb.org/t/p/w500${poster}`} alt={film.title} />
            </div>
            <div className={s.left}>
              <h1>{film.title}</h1>
              <h2>Episod {film.episode_id}, Release Date: {film.release_date}</h2>
              <p className="text" >{film.opening_crawl}</p>
              <h3>Director: {film.director}</h3>
              <h3>Producer: {film.producer}</h3>
              <div className={s.buttons}>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={planets ? true : false}
                  onClick={() => setPlanets(true)}
                >
                  Planets
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={starships ? true : false}
                  onClick={() => setStarships(true)}
                >
                  Starships
              </Button>
              </div>
              <div className={s.bottom}>
                {planets ? <Planets urls={film.planets} /> : null}
                {starships ? <Starships urls={film.starships} /> : null}
              </div>
            </div>
          </Box>
        )
      }
    </>
  );
}

export default Film;