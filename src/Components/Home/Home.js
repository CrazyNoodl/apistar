import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Main from '../Main/Main';
import './Home.scss';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

function searchingFor(term) {
  return function (x) {
    return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class Home extends Component {
  state = {
    films: null,
    loading: true,
    search: '',
  }

  async componentDidMount() {
    const url = 'https://swapi.co/api/films';
    const req = await fetch(url);
    const data = await req.json();
    this.setState({
      films: data.results,
      loading: false,
    })
  }

  sortByName = () => {
    this.setState(prevState => {
      return {
        films: prevState.films.sort((a, b) => {
          let nameA = a.title,
            nameB = b.title
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        }),
      }
    })
  }

  sortByEpisode = () => {
    this.setState(prewState => {
      return {
        films: prewState.films.sort((a, b) => a.episode_id - b.episode_id)
      }
    })
  }

  sortByDate = () => {
    this.setState(prevState => {
      return {
        films: prevState.films.sort((a, b) => {
          let nameA = a.release_date,
            nameB = b.release_date
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        }),
      }
    })
  }

  searching = (e) => {
    this.setState(
      {
        search: e.target.value,
      });
  }

  render() {
    return (
      <>
        {this.state.loading || !this.state.films ? (
          <div className="spinner">
            <CircularProgress color="secondary" size={200} />
          </div>
        ) : (
            <div className='container'>
              <div className='control'>
                <ButtonGroup size="large" color="inherit" variant="text" aria-label="large outlined primary button group">
                  <Button onClick={this.sortByName}>Sort by Name</Button>
                  <Button onClick={this.sortByEpisode}>Sort by Episode</Button>
                  <Button onClick={this.sortByDate}>Sort by Date</Button>
                </ButtonGroup>
                <input onChange={this.searching} type="text" placeholder="live search"></input>
              </div>
              <div className='table'>
                {this.state.films.filter(searchingFor(this.state.search)).map((film, index) => (
                  <Main
                    key={index}
                    about={film}
                  />
                )
                )
                }
              </div>
            </div >
          )
        }
      </>
    );
  }
}

export default Home;