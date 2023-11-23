import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import Layout from "./app/Layout.tsx";
import store from "./app/store.ts";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
        <Layout>
            <App />
        </Layout>
      </Provider>
  </React.StrictMode>,
)
