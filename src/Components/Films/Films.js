import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


function Films(props) {

  const [loading, setLoading] = useState(true)
  const [films, setFilms] = useState([])

  const getUrl = (url) => {
    let modifiedUrl = url.split('/');

    return modifiedUrl[modifiedUrl.length - 2];
  }


  useEffect(() => {
    async function fetchData() {

      let requests = props.urls.map(url => fetch(url));

      await Promise.all(requests)
        .then(async responses => await Promise.all(responses.map(r => r.json())))
        .then(data => setFilms(data));

      setLoading(false)
    };

    fetchData();
  }, [props]);

  return (
    <>
      {loading || !films ? (
        <div className="spinner">
          <CircularProgress color="secondary" size={200} />
        </div>
      ) : (
          <List className="list" component="ul" aria-label="secondary mailbox folders">
            <h3>FILMS</h3>
            {films.map((film, index) =>
              <>
                <ListItem button key={index}>
                  <ListItemText
                    onClick={() => props.history.push('/films/' + getUrl(props.urls[index]))}
                    primary={film.title}
                  />
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

export default withRouter(Films);