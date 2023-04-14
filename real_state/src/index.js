import React from 'react'
import App from './pages/App'
import * as ReactDOMClient from 'react-dom/client'
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(<App tab="home" />)


