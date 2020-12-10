import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles/'
import theme from './components/theme';


const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme} >
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
