import React, { useState, useEffect, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom'
import List from '@material-ui/core/List';
import { getUrl } from '../../utils/index';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { saveNeedFilms, saveCurrentFilm } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { changeHttpToHttps } from '../../utils/index'

function Films(props) {

  const { films } = useSelector(state => ({
    films: state.needFilms,
  }))

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(!films.length)

  useEffect(() => {
    async function fetchData() {
      let newUrls = changeHttpToHttps(props.urls);

      let requests = newUrls.map(url => fetch(url));

      await Promise.all(requests)
        .then(async responses => await Promise.all(responses.map(r => r.json())))
        .then(data => dispatch(saveNeedFilms(data)));

      setLoading(false)
    };

    if (films.length === 0) {
      fetchData();
    }
  }, [props]);

  return (
    <>
      {loading ? (
        <div className="spinner">
          <CircularProgress color="secondary" size={200} />
        </div>
      ) : (
          <List className="list" component="ul" aria-label="secondary mailbox folders">
            <h3>FILMS</h3>
            {films.map((film, index) =>
              <Fragment key={film.title}>
                <ListItem button key={index}>
                  <ListItemText
                    onClick={() => {
                      props.history.push('/films/' + getUrl(props.urls[index]))
                      dispatch(saveCurrentFilm(film))
                    }}
                    primary={film.title}
                  />
                </ListItem>
                <Divider light={true} />
              </Fragment>
            )}
          </List>
        )
      }
    </>
  );
}

export default withRouter(Films);
