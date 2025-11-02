import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // <- Import Redux Provider
import App from './App';
import store from './store/store.jsx';        // <- Import du store Redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>           {/* Entoure App avec le Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
