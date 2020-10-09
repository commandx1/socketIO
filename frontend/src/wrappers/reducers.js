import { FETCH_DATA } from "./types";

const fetchData = (dollar, state) => {
  return {
    ...state,
    dollar: dollar,
  };
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return fetchData(action.payload, state);
    default:
      return state;
  }
};
