import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';

function Starships(props) {

  const [loading, setLoading] = useState(true)
  const [starships, setStarships] = useState([])
  const [urls, setUrls] = useState([])

  const getUrl = (url) => {
    url = url.split('/');
    return url[url.length - 2];
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let requests = urls.map(url => fetch(url));
        setUrls(props.urls)

        Promise.all(requests)
          .then(responses => {
            return responses;
          })
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(data => setStarships(data));

        setLoading(false)

      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [urls, props]);

  return (
    <>
      {loading || !starships ? (
        <CircularProgress color="secondary" />
      ) : (
          <List className="list list--left" component="ul" aria-label="secondary mailbox folders">
            <h3>STARSHIPS</h3>
            {starships.map((starship, index) =>
              <>
                <ListItem button>
                  <ListItemText
                    onClick={() => props.history.push('/starships/' + getUrl(props.urls[index]))}
                    key={index}
                    primary={starship.name} />
                </ListItem>
                <Divider light={true} />
              </>
            )}
          </List>
        )
      }
    </>
  );
}

export default withRouter(Starships);