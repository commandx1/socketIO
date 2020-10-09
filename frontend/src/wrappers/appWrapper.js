import React, { useReducer } from "react";
import { myContext } from "./context";
import { appReducer } from "./reducers";
import { FETCH_DATA } from "./types";

const PageContent = (props) => {
  const initialState = { dollar: [] };

  const [globalState, dispatch] = useReducer(appReducer, initialState);

  const functions = {
    dollars: {
      fetchData: (dollar) => {
        dispatch({
          type: FETCH_DATA,
          payload: dollar,
        });
      },
    },
    //Başka fonksiyonlar da olabilir, hepsini contextte bir objenin içinde tutmayı tercih ettim...
  };

  return (
    <myContext.Provider
      value={{
        globalState,
        functions,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default PageContent;
