import { MainProgram, roots } from "../index";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
class BadgeNotification extends Component {
  constructor(props) {
    super(props);

    this.show = ({
      delay = 3000,
      text = "",
      variant = "danger",
      position = "bottom",
      close = false,
    }) => {
      let after = (
        <>
          <MainProgram>
            <div className="d-flex justify-content-center">
              {!close && (
                <Alert
                  hidden={true}
                  className="position-fixed d-flex justify-content-between align-items-center"
                  style={
                    position == "bottom"
                      ? {
                          width: "92%",
                          bottom: 0,
                          maxWidth: "470px",
                          zIndex: "9999999",
                        }
                      : {
                          width: "92%",
                          top: 0,
                          marginTop: "50px",
                          maxWidth: "470px",
                          zIndex: "9999999",
                        }
                  }
                  variant={variant}
                >
                  {text}
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.show({ close: true, delay: 100 });
                    }}
                    className="fa fa-times"
                  ></i>
                </Alert>
              )}
            </div>
          </MainProgram>
        </>
      );

      let before = <MainProgram />;
      roots.render(after);

      setTimeout(() => {
        roots.render(before);
      }, delay);
    };
  }
}

export const BadgeNotif = new BadgeNotification();
