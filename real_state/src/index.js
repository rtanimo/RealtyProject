import React from 'react'
import App from './pages/App'
import * as ReactDOMClient from 'react-dom/client'
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)


