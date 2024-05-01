import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import Layout from './components/templates/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './redux/store';


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <BrowserRouter>
//       <Layout />
//     </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter> <Layout />  </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

