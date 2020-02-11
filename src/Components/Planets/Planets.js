import React, { useState, useEffect } from 'react';
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
  const [urls, setUrls] = useState([])

  const getUrl = (url) => {
    url = url.split('/');
    return url[url.length - 2];
  }

  useEffect(() => {
    async function fetchData() {
      setUrls(props.urls)
      let requests = urls.map(url => fetch(url));

      Promise.all(requests)
        .then(responses => {
          return responses;
        })
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(planets => setPlanets(planets))
    };

    fetchData();
    setLoading(false);
  }, [urls, props]);

  return (
    <>
      {loading || !planets ? (
        <CircularProgress color="secondary" size={50} />
      ) : (
          <>
            <List className="list" component="ul" aria-label="secondary mailbox folders">
              <h3>PLANETS</h3>
              {planets.map((planet, index) =>
                <>
                  <ListItem key={index} button>
                    <ListItemText
                      onClick={() => props.history.push('/planets/' + getUrl(props.urls[index]))}
                      key={index}
                      primary={planet.name}
                    />
                  </ListItem>
                  <Divider light={true} />
                </>
              )}
            </List>
          </>
        )
      }
    </>
  );
}

export default withRouter(Planets);