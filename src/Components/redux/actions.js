import { ENDPOINTS } from '../../constants/api';

const ACTION_TYPES = {
  START_LOADING: 'START_LOADING',
  LOAD_FILMS: 'LOAD_FILMS',
  SET_ERROR: 'SET_ERROR',
  STOP_LOADING: 'STOP_LOADING',
  SORT_BY_NAME: 'SORT_BY_NAME',
  SORT_BY_DATE: 'SORT_BY_DATE',
  SORT_BY_EPISOD: 'SORT_BY_EPISOD',
  SORT_BY_LIVE: 'SORT_BY_LIVE',
  LOADING_PLANETS: 'LOADING_PLANETS',
  LOADING_STARSHIPS: 'LOADING_STARSHIPS',
  SAVE_CURRENT_FILM: 'SAVE_CURRENT_FILM',
  SAVE_CURRENT_PLANET: 'SAVE_CURRENT_PLANET',
  SAVE_CURRENT_STARSHIP: 'SAVE_CURRENT_STARSHIP',
  SAVE_NEED_FILMS: 'SAVE_NEED_FILMS',
}

const startLoading = () => {
  return {
    type: ACTION_TYPES.START_LOADING,
  }
}

const stopLoading = () => {
  return {
    type: ACTION_TYPES.STOP_LOADING,
  }
}

const loadingFilms = (data) => {
  return {
    type: ACTION_TYPES.LOAD_FILMS,
    payload: data.results,
  }
}

export const loadingPlanets = (data) => {
  return {
    type: ACTION_TYPES.LOADING_PLANETS,
    payload: data,
  }
}

export const loadingStarships = (data) => {
  return {
    type: ACTION_TYPES.LOADING_STARSHIPS,
    payload: data,
  }
}

export const saveCurrentFilm = (data) => {
  return {
    type: ACTION_TYPES.SAVE_CURRENT_FILM,
    payload: data,
  }
}

export const saveNeedFilms = (data) => {
  return {
    type: ACTION_TYPES.SAVE_NEED_FILMS,
    payload: data,
  }
}


export const saveCurrentPlanet = (data) => {
  return {
    type: ACTION_TYPES.SAVE_CURRENT_PLANET,
    payload: data,
  }
}

export const saveCurrentShip = (data) => {
  return {
    type: ACTION_TYPES.SAVE_CURRENT_STARSHIP,
    payload: data,
  }
}

export const setError = (error) => {
  return {
    type: ACTION_TYPES.SET_ERROR,
    payload: error.message,
  }
}

export const sortByName = () => {
  return {
    type: ACTION_TYPES.SORT_BY_NAME,
  }
}

export const sortByEpisod = () => {
  return {
    type: ACTION_TYPES.SORT_BY_EPISOD,
  }
}

export const sortByDate = () => {
  return {
    type: ACTION_TYPES.SORT_BY_DATE,
  }
}

export const sortByLive = (event) => {
  return {
    type: ACTION_TYPES.SORT_BY_LIVE,
    payload: event,
  }
}

export const loadFilms = () => dispatch => {

  dispatch(startLoading());

  fetch('https://swapi.dev/api/films/')
    .then(res => res.json())
    .then(data => dispatch(loadingFilms(data)))
    .catch((error) => dispatch(setError(error)))
    .finally(() => dispatch(stopLoading()))
}

export default ACTION_TYPES;