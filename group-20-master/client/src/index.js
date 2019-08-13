import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';

//It IS used, don't delete
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

function mainRender() {
    ReactDOM.render(
    <Router>
        <Route path ="/" component={App}></Route>
    </Router>,
    document.getElementById('root')
    );
}
mainRender();
/*
//To prevent FOUC (Flicker of unrendered content)
if (process.env.NODE_ENV !== "production") {
    // Workaround for https://github.com/facebook/create-react-app/issues/6399
    // until it gets fixed upstream
    setTimeout(() => {
      mainRender();
    }, 20);
  } else {
    mainRender();
  }
*/


