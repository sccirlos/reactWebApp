import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Ghibli from './components/Ghibli'


class App extends React.Component {
  render(){
    return (
      <Ghibli />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)