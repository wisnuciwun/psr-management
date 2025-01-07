import { HomeCarousel } from "components";
import React, { Component, Fragment } from "react";
import { Button, Card } from "react-bootstrap";
import OrganizationStructure from "./OrganizationStructure";
import Contacts from "./Contacts";
import axios from "axios";
import request from "utils/request";
import moment from "moment";
import { NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_news: [],
    };
  }

  onGetAllNews = async () => {
    await request.get("/all-news").then((res) => {
      if (res.data.success) {
        this.setState({
          data_news: res.data.data,
        });
      }
    });
  };

  componentDidMount() {
    this.onGetAllNews();
  }

  render() {
    return (
      <Fragment>
        <HomeCarousel />
        <div className="p-3">
          <h4>Selayang Pandang</h4>
          <p>Selamat datang di website Baraya Swarga</p>
          {/* <video style={{ width: "100%" }} controls={false} autoPlay>
            <source src="assets/pengurus.mp4" type="video/mp4" />
          </video> */}
          <h4>Berita</h4>
          {this.state.data_news.length != 0 ? (
            this.state.data_news.map((v) => {
              return (
                <Card className="p-0">
                  <Card.Body>
                    <p style={{ fontSize: 11 }}>
                      {moment(v.created_at).format("DD MMM YYYY")}
                    </p>
                    <h5>{v.title}</h5>
                    <p>{v.body.substring(0, 100)}...</p>
                    <NavLink
                      style={{ color: "black", textDecoration: "none" }}
                      to={`/berita/${v.id}`}
                    >
                      <div className="d-flex justify-content-center">
                        <Button className="w-100 btn-light">
                          <span>
                            <i className="fa fa-search">&nbsp;&nbsp;</i>
                            Selengkapnya
                          </span>
                        </Button>
                      </div>
                    </NavLink>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>Belum ada berita yang dapat ditampilkan.</div>
          )}
          <br />
          <h4>Struktur Organisasi</h4>
          <br />
          <OrganizationStructure />
          <br />
          <h4 className="mb-3">Hubungi Kami</h4>
          <Contacts />
        </div>
      </Fragment>
    );
  }
}

export default Home;
