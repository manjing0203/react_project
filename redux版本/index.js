import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App store={store}/>
)
store.subscribe(()=>{
  root.render(
    <App store={store}/>
  )
 }
)
