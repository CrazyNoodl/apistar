import ACTION_TYPES from './actions';

const initiaState = {
  isLoading: true,
  films: [],
  needFilms: null,
  term: '',
  error: null,
  filmsLoaded: false,
  starships: null,
  planets: null,
  needPlanets: null,
  needStarships: null,
  showPlanets: null,
  showStarships: null,
  currentFilm: null,
  currentPlanet: null,
  currentShip: null,
}

function rootReducer(state = initiaState, action) {
  console.log(action)
  switch (action.type) {
    case ACTION_TYPES.START_LOADING:

      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ACTION_TYPES.LOAD_FILMS:

      return {
        ...state,
        isLoading: true,
        films: action.payload,
      };

    case ACTION_TYPES.SAVE_CURRENT_PLANET:

      let planets = state.films.filter(film => action.payload.films.find(item => item === film.url))

      return {
        ...state,
        currentPlanet: action.payload,
        needFilms: planets,
        needPlanets: null,
      };

    case ACTION_TYPES.SAVE_CURRENT_STARSHIP: {

      let planets = state.films.filter(film => action.payload.films.find(item => item === film.url))

      return {
        ...state,
        currentShip: action.payload,
        needFilms: planets,
        needStarships: null,
      }
    }

    case ACTION_TYPES.LOADING_PLANETS: {

      if (state.planets === null) {

        return {
          ...state,
          planets: action.payload,
          showPlanets: action.payload,
        }
      }

      let newList = [...state.planets, ...action.payload];
      let copyPlanets = [...newList]

      let currentPlanets = state.currentFilm.planets;
      let testPlanet = copyPlanets.filter(i => currentPlanets.find(a => a === i.url));

      return {
        ...state,
        showPlanets: testPlanet,
        planets: newList,
      };
    }

    case ACTION_TYPES.LOADING_STARSHIPS: {

      if (state.starships === null) {

        return {
          ...state,
          starships: action.payload,
          showStarships: action.payload,
        }
      }

      let newList = [...state.starships, ...action.payload];
      let copyStarships = [...newList];
      let currentStarships = state.currentFilm.starships;
      let testStarships = copyStarships.filter(i => currentStarships.find(a => a === i.url));

      return {
        ...state,
        showStarships: testStarships,
        starships: newList,
      }
    }

    case ACTION_TYPES.SAVE_CURRENT_FILM: {

      if (state.planets === null && state.starships === null) {
        return {
          ...state,
          currentFilm: action.payload,
          needPlanets: action.payload.planets,
          needStarships: action.payload.starships,
        }
      }

      if (state.starships === null) {
        let currentPlanets = action.payload.planets;
        let planets = state.planets;
        let needPlanets = currentPlanets.filter(i => planets.findIndex(a => a.url === i) === -1)

        return {
          ...state,
          currentFilm: action.payload,
          needPlanets,
        };
      }

      if (state.planets === null) {
        let currentStarships = action.payload.starships;
        let starships = state.starships;
        let needStarships = currentStarships.filter(i => starships.findIndex(a => a.url === i) === -1);

        return {
          ...state,
          currentFilm: action.payload,
          needStarships,
        };
      }

      let currentPlanets = action.payload.planets;
      let currentStarships = action.payload.starships;
      let planets = state.planets;
      let starships = state.starships;
      let needPlanets = currentPlanets.filter(i => planets.findIndex(a => a.url === i) === -1)
      let needStarships = currentStarships.filter(i => starships.findIndex(a => a.url === i) === -1);

      return {
        ...state,
        currentFilm: action.payload,
        needPlanets,
        needStarships,
      }
    }

    case ACTION_TYPES.SAVE_NEED_FILMS:

      return {
        ...state,
        needFilms: action.payload,
      };

    case ACTION_TYPES.SET_ERROR:

      return {
        ...state,
        isLoading: false,
        films: null,
        error: action.payload,
      };

    case ACTION_TYPES.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
        filmsLoaded: true,
      }

    case ACTION_TYPES.CLICKED_FILMS:

      return {
        ...state,
        clickedFilm: action.payload,
      }

    case ACTION_TYPES.SORT_BY_NAME: {
      const newList = [...state.films];

      newList.sort((a, b) => {
        let nameA = a.title,
          nameB = b.title
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      })

      return {
        ...state,
        films: newList,
      }
    }
    case ACTION_TYPES.SORT_BY_EPISOD: {
      const newList = [...state.films];
      newList.sort((a, b) => a.episode_id - b.episode_id)

      return {
        ...state,
        films: newList,
      }
    }
    case ACTION_TYPES.SORT_BY_DATE: {
      const newList = [...state.films];
      newList.sort((a, b) => {
        let nameA = a.release_date,
          nameB = b.release_date
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      });

      return {
        ...state,
        films: newList,
      }
    }

    case ACTION_TYPES.SORT_BY_LIVE: {

      return {
        ...state,
        term: action.payload,
      }
    }

    default:
      return state;
  }
}

export default rootReducer;
