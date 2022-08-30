import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/auth';
import cartReducer from './reducers/cart';
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer
  }
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
