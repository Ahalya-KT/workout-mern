import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WorkoutContextprovider } from './context/WorkoutContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <WorkoutContextprovider> 
    <App />
   </WorkoutContextprovider>
  </React.StrictMode>,
)
