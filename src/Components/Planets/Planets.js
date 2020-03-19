import React, { useState, useEffect, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadingPlanets, saveCurrentPlanet } from '../redux/actions';
import List from '@material-ui/core/List';
import { getUrl } from '../../utils/index';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './Planets.scss'

function Planets({ urls, needPlanets, savePlanets, planets, history, saveCurrentPlanet }) {

  const [loading, setLoading] = useState(needPlanets !== null)

  useEffect(() => {
    async function fetchData() {

      let requests = urls.map(url => fetch(url));

      await Promise.all(requests)
        .then(async responses => await Promise.all(responses.map(planet => planet.json())))
        .then(planets => savePlanets(planets))

      setLoading(false);
    };

    if (needPlanets) {
      fetchData();
    }

  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" size={50} />
      ) : (
          <>
            <List className="list" component="ul" aria-label="secondary mailbox folders">
              <h3>PLANETS</h3>
              {planets.map((planet, index) =>
                <Fragment key={planet.name}>
                  <ListItem button>
                    <ListItemText
                      onClick={() => {
                        history.push('/planets/' + getUrl(planets[index].url))
                        saveCurrentPlanet(planet)
                      }}
                      primary={planet.name}
                    />
                  </ListItem>
                  <Divider light={true} />
                </Fragment>
              )}
            </List>
          </>
        )
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    urls: state.needPlanets,
    planets: state.showPlanets,
    needPlanets: state.needPlanets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePlanets: (data) => dispatch(loadingPlanets(data)),
    saveCurrentPlanet: (data) => dispatch(saveCurrentPlanet(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Planets));