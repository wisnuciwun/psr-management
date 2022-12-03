import logo from './logo.svg';
import Home from 'pages/Home';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeNavbar } from 'components';

function App() {
  return (
    <Fragment>
      <div className="app">
        <div style={{ maxWidth: '500px' }}>
          <HomeNavbar/>
          <Home />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
