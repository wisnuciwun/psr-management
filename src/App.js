import logo from "./logo.svg";
import Home from "pages/Home";
import { Fragment, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomeNavbar } from "components";
import { Button, Modal, ModalBody, NavLink, Spinner } from "react-bootstrap";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import routes from "./routes";
import OrganizationStructure from "pages/OrganizationStructure";
import HomeFooter from "components/HomeFooter";
import { getCookie, setCookie } from "tiny-cookie";

function App() {
  const isLogin = getCookie("token");
  const navigate = useNavigate();

  return (
    <Fragment>
      <Suspense
        fallback={
          <div
            style={{
              position: "fixed",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: '100%',
              height: '100%'
            }}
          >
            <Spinner />
          </div>
        }
      >
        <div className="app position-relative">
          <div className="screen">
            <HomeNavbar />
            <Routes>
              {routes.map((route, idx) => {
                if (route.protected && isLogin === null) {
                  return (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={
                        <>
                          <Modal
                            centered
                            isOpen={true}
                            modalTransition={{ timeout: 700 }}
                            backdropTransition={{ timeout: 1300 }}
                          >
                            <ModalBody className="w-100  d-flex justify-content-center flex-wrap">
                              <div>Silahkan login terlebih dahulu</div>
                              <NavLink href="/">
                                <Button>Kembali ke home</Button>
                              </NavLink>
                            </ModalBody>
                          </Modal>
                        </>
                      }
                    ></Route>
                  );
                } else {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element navigate={navigate} />}
                      />
                    )
                  );
                }
              })}
            </Routes>
            <HomeFooter />
          </div>
        </div>
      </Suspense>
    </Fragment>
  );
}

export default App;
