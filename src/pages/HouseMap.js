import React, { Component } from "react";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import request from "utils/request";

export class HouseMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      dataCitizens: [],
    };
  }

  onSearchKeyword = () => {
    request.get("/backoffice/users").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataCitizens: res.data.docs,
        });
      }
    });
  };

  componentDidMount = () => {
    this.onSearchKeyword()
  }

  render() {
    return (
      <Container>
        <div className="font-md mb-2">
          Silahkan cari data penduduk berdasarkan nama melalui input di bawah
          ini :
        </div>
        <FormGroup
          className="mb-2 position-relative d-flex"
          style={{ gap: "5px" }}
        >
          <FormControl
            type="text"
            name="searchKeyword"
            value={this.state.searchKeyword}
            onChange={(e) => {
              this.setState({
                searchKeyword: e.target.value,
              });
            }}
            required={false}
          />
          <Button className="btn-success">
            <i className="fa fa-search text-light"></i>
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default HouseMap;
