import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortByName, sortByEpisod, sortByDate, loadFilms, sortByLive } from '../redux/actions';
import { getFilms, getIsLoading, getFilmsLoaded, getTermForSearch, getError } from '../redux/selectors';
import Main from '../Main/Main';
import { TEXT } from '../../constants/text';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Home.scss';

function searchingFor(term) {
  return function (x) {
    return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class Home extends Component {

  componentDidMount() {
    const { loadFilms, filmsLoaded } = this.props

    if (!filmsLoaded) {
      loadFilms()
    }
  }

  render() {
    const { films, isLoading, onName, onEpisod, onDate, searching, term, error } = this.props

    return (
      <>
        {error ? (
          <>
            {error}
            <button onClick={this.props.loadFilms}>{TEXT.ERROR_LOADING}</button>
          </>
        ) : (
            <>
              {isLoading ? ( // ??????????
                <div className="spinner">
                  <CircularProgress color="secondary" size={200} />
                </div>
              ) : (
                  <div className='container'>
                    <div className='control'>
                      <ButtonGroup size="large" color="inherit" variant="text" aria-label="large outlined primary button group">
                        <Button onClick={onName}>Sort by Name</Button>
                        <Button onClick={onEpisod}>Sort by Episod</Button>
                        <Button onClick={onDate}>Sort by Date</Button>
                      </ButtonGroup>
                      <input onChange={searching} type="text" placeholder="live search"></input>
                    </div>
                    <div className='table'>
                      {films.filter(searchingFor(term)).map((film, index) => (
                        <Main
                          key={film.episode_id}
                          about={film}
                          index={index}
                        />
                      )
                      )
                      }
                    </div>
                  </div >
                )}
            </>
          )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    films: getFilms(state),
    isLoading: getIsLoading(state),
    filmsLoaded: getFilmsLoaded(state),
    term: getTermForSearch(state),
    error: getError(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadFilms: () => dispatch(loadFilms()),
    onName: () => dispatch(sortByName()),
    onEpisod: () => dispatch(sortByEpisod()),
    onDate: () => dispatch(sortByDate()),
    searching: (e) => dispatch(sortByLive(e.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);