import { legacy_createStore as createStore } from 'redux';

// Initial state
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

// Reducer function
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(changeState);

export default store;
