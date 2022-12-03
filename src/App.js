import logo from './logo.svg';
import Home from 'pages/Home';
import { Fragment, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeNavbar } from 'components';
import { Spinner } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import OrganizationStructure from 'pages/OrganizationStructure';

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={<Spinner />}
      >
        <Router>
          <div className="app">
            <div className='screen'>
              <HomeNavbar/>
              <Route exact path="/" component={Home} />
              <Route exact path="/struktur" name="Struktur" component={OrganizationStructure} />
              {/* <Route>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.e />}
                />
              )
            )
          })}
        </Route> */}

            </div>
          </div>
        </Router>
      </Suspense>

    </Fragment>
  );
}

export default App;
