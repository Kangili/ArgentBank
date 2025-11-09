import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';  // <- Ajout du Router
import App from './App';
import store from './store/store.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>         {/* <-- Entoure App avec le Router */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

