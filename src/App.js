import logo from './logo.svg';
import Home from 'pages/Home';
import { Fragment, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeNavbar } from 'components';
import { Spinner } from 'reactstrap';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import OrganizationStructure from 'pages/OrganizationStructure';
import HomeFooter from 'components/HomeFooter';

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={<Spinner />}
      >
        <div className="app">
          <div className='screen'>
            <HomeNavbar />
            <BrowserRouter>
              <Routes>
                {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element />}
                      />
                    )
                  )
                })}
              </Routes>
            </BrowserRouter>
            <HomeFooter />
          </div>
        </div>
      </Suspense>

    </Fragment>
  );
}

export default App;
