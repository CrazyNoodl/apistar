import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Films from '../Films/Films';
import Button from '@material-ui/core/Button';
import './Planet.scss'

function Planet(props) {

  const [loading, setLodaing] = useState(true)
  const [planet, setPlanet] = useState(null)
  const [films, setFilms] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://swapi.co/api${props.location.pathname}`);
        const data = await res.json();

        setPlanet(data)
        setLodaing(false)
        console.log(data)
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [props]);

  return (
    <>
      {loading || !planet ? (
        <CircularProgress color="secondary" />
      ) : (
          <div className="planet">
            <h1>{planet.name}</h1>
            <h3>Rotation Period {planet.rotation_period}</h3>
            <h3>Orbital Period: {planet.orbital_period}</h3>
            <h3>Diameter: {planet.diameter}</h3>
            <h3>Climate: {planet.climate}</h3>
            <h3>Gravity: {planet.gravity}</h3>
            <p>Terrain: {planet.terrain}</p>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              disabled={films ? true : false}
              onClick={() => setFilms(true)}
            >
              FILMS
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => props.history.goBack()}
            >
              GO BACK
            </Button>
            {films ? <Films urls={planet.films} /> : null}
          </div>
        )
      }
    </>
  );
}

export default Planet;