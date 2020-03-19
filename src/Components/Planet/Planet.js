import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Films from '../Films/Films';
import Button from '@material-ui/core/Button';
import { API } from '../../constants/api';
import './Planet.scss';
import { saveCurrentPlanet } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

function Planet({ location, history }) {

  const { currentPlanet } = useSelector(state => ({ //вместо mapStateToProps
    currentPlanet: state.currentPlanet,
  }));

  const dispatch = useDispatch(); //вместо mapDispatchToProps

  const [loading, setLodaing] = useState(currentPlanet === null)
  const [films, setFilms] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API}${location.pathname}`);

        const planet = await response.json();
        dispatch(saveCurrentPlanet(planet))
        setLodaing(false)
      } catch (error) {
        console.error(error);
      }
    };

    if (!currentPlanet) {
      fetchData();
    }

  }, [location]);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
          <div className="planet">
            <h1>{currentPlanet.name}</h1>
            <h3>Rotation Period {currentPlanet.rotation_period}</h3>
            <h3>Orbital Period: {currentPlanet.orbital_period}</h3>
            <h3>Diameter: {currentPlanet.diameter}</h3>
            <h3>Climate: {currentPlanet.climate}</h3>
            <h3>Gravity: {currentPlanet.gravity}</h3>
            <p>Terrain: {currentPlanet.terrain}</p>
            <p>Population: {currentPlanet.population}</p>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              disabled={films}
              onClick={() => setFilms(true)}
            >
              FILMS
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => history.goBack()}
            >
              GO BACK
            </Button>
            {films ? <Films urls={currentPlanet.films} /> : null}
          </div>
        )
      }
    </>
  );
}

export default Planet;