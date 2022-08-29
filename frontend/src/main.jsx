import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'vite/modulepreload-polyfill'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './reducers/auth';
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: loginSlice.reducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)
