import React, { useState, useEffect, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import { getUrl } from '../../utils/index';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import { loadingStarships, saveCurrentShip } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Starships({ history }) {

  const { urls, starships, needStarships } = useSelector(state => ({
    urls: state.needStarships,
    starships: state.showStarships,
    needStarships: state.needStarships
  }))

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(needStarships !== null)

  useEffect(() => {
    async function fetchData() {
      try {
        let requests = urls.map(url => fetch(url));

        await Promise.all(requests)
          .then(async responses => await Promise.all(responses.map(starship => starship.json())))
          .then(starships => dispatch(loadingStarships(starships)));

        setLoading(false)

      } catch (error) {
        console.error(error);
      }
    };
    if (needStarships) {
      fetchData();
    }
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
          <>
            <List className="list list--left" component="ul" aria-label="secondary mailbox folders">
              <h3>STARSHIPS</h3>
              {starships.map((starship, index) =>
                <Fragment key={starship.name}>
                  <ListItem button>
                    <ListItemText
                      onClick={() => {
                        history.push('/starships/' + getUrl(starships[index].url))
                        dispatch(saveCurrentShip(starship))
                      }}
                      primary={starship.name} />
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

export default withRouter(Starships);