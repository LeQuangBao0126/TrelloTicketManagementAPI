import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'font-awesome/css/font-awesome.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer }   from 'react-toastify';

const container = document.getElementById('root')
const root = createRoot(container)
root.render( 
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <ToastContainer/>
        </Provider>
    </BrowserRouter>
)

reportWebVitals()
