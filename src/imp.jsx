import React from 'react';
import ReactDOM from 'react-dom/client';

let App;

if (window.location.pathname.startsWith('/admin')) {
  // If the path starts with '/admin', load the Dashboard application
  App = import('./index.jsx'); // Adjust the path based on your project structure
} else {
  // For all other paths, load the Frontend application
  App = import('./main.jsx'); // Adjust the path based on your project structure
}

App.then(({ default: MainApp }) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<MainApp />);
}).catch(err => {
  console.error('Error loading app:', err);
});
