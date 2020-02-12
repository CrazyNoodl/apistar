import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Films from '../Films/Films';
import Button from '@material-ui/core/Button';

function Starship(props) {

  const [loading, setLodaing] = useState(true)
  const [starship, setStarship] = useState(null)
  const [films, setFilms] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://swapi.co/api${props.location.pathname}`);
        const data = await res.json();

        setStarship(data)
        setLodaing(false)
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [props]);

  return (
    <>
      {loading || !starship ? (
        <CircularProgress color="secondary" size={200} />
      ) : (
          <div className="planet">
            <h1>{starship.name}</h1>
            <h3>Model {starship.model}</h3>
            <h3>Manufacturer: {starship.manufacturer}</h3>
            <h3>Cost In Credits: {starship.cost_in_credits}</h3>
            <h3>Length: {starship.length}</h3>
            <p>Crew: {starship.crew}</p>

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
            {films ? <Films urls={starship.films} /> : null}
          </div>
        )
      }
    </>
  );
}

export default Starship;