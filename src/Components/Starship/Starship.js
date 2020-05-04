import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCurrentShip } from '../redux/actions';
import { API } from '../../constants/api';
import Films from '../Films/Films';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function Starship(props) {
  const { currentShip } = useSelector(state => ({
    currentShip: state.currentShip,
  }));

  const dispatch = useDispatch();

  const [loading, setLodaing] = useState(currentShip === null)
  const [films, setFilms] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API}${props.location.pathname}/`);
        const ship = await response.json();
        dispatch(saveCurrentShip(ship))
        setLodaing(false)
      } catch (error) {
        console.error(error);
      }
    };

    if (!currentShip) {
      fetchData();
    }

  }, [props]);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" size={200} />
      ) : (
          <div className="planet">
            <h1>{currentShip.name}</h1>
            <h3>Model {currentShip.model}</h3>
            <h3>Manufacturer: {currentShip.manufacturer}</h3>
            <h3>Cost In Credits: {currentShip.cost_in_credits}</h3>
            <h3>Length: {currentShip.length}</h3>
            <p>Crew: {currentShip.crew}</p>

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
              onClick={() => props.history.goBack()}
            >
              GO BACK
            </Button>
            {films ? <Films urls={currentShip.films} /> : null}
          </div>
        )
      }
    </>
  );
}

export default Starship;