import { MainProgram, roots } from "../index";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
class BadgeNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opens: false,
    };

    this.show = ({ delay = 3000, text = "", variant = "danger" }) => {
     
      let after = (
        <>
          <MainProgram>
            <div className="d-flex justify-content-center">
              <Alert
                hidden={!this.state.opens}
                className="position-fixed d-flex justify-content-between align-items-center"
                style={{
                  width: "92%",
                  bottom: 0,
                  maxWidth: "470px",
                  zIndex: "9999999",
                }}
                variant={variant}
              >
                {text}
                <i
                  style={{ cursor: "pointer" }}
               //    onClick={() => {
               //      console.log("msk")
               //      this.setState({
               //        opens: false,
               //      });
               //    }}
                  className="fa fa-times"
                ></i>
              </Alert>
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
