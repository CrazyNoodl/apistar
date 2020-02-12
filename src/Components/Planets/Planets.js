import React, { useState, useEffect, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './Planets.scss'

function Planets(props) {

  const [loading, setLoading] = useState(true)
  const [planets, setPlanets] = useState([])

  const getUrl = (url) => {
    let modifiedUrl = url.split('/');

    return modifiedUrl[modifiedUrl.length - 2];
  }

  useEffect(() => {
    async function fetchData() {
      let requests = props.urls.map(url => fetch(url));

      await Promise.all(requests)
        .then(async responses => await Promise.all(responses.map(r => r.json())))
        .then(planets => setPlanets(planets))

      setLoading(false);
    };

    fetchData();
  }, [props]);

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
                      onClick={() => props.history.push('/planets/' + getUrl(props.urls[index]))}
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

export default withRouter(Planets);