"use client"
import React, { Dispatch, useEffect } from "react"
import store, { AppDispatch } from '@/redux/store'; 
import { Provider as ReduxProvider } from 'react-redux';


function Provider({ children } : { children: React.ReactNode }) {

    return (
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    )
  }
  
  export default Provider