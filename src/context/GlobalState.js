import React, { createContext, useReducer } from 'react';
import { Reducer }  from './AppReducer';

// initial state
const initialState = {
   location: {},
   // errorMsg: 'is this working?',
   bizArr: [{name: "init state in global state context"}],
}

// create context
export const GlobalContext = createContext();

// Provider component - so all elements have access to global state
// chidlren are the elements we wrap in it
export const GlobalProvider = ({ children }) => {
   const [state, dispatch] = useReducer(Reducer, initialState);

   // const bizArr = getData(); // for some reason this returns a few promises?????

   return   (<GlobalContext.Provider value={{state, dispatch}}>
               {children}
            </GlobalContext.Provider>);
}