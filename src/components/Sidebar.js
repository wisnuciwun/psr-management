import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Sidebar = () => {
  let menu = window.location.href;
  return (
    <div style={{ paddingRight: "15px", width: "250px" }}>
      <div style={{ width: "250px" }} className="bg-secondary-yellow left">
        <div className="text-center mt-4 mb-4">
          <i class="fa fa-wrench fa-5x" style={{color: 'white'}}></i>
          <br />
          <div style={{color: 'white'}} className="font-md">Admin Control Panel</div>
        </div>
        <div
          style={{ backgroundColor: menu.includes("banner") ? "#fec439" : "" }}
          className="bg-tabmenu"
        >
          <Link className="menu font-lg d-flex" to="/admin/banner">
            <div style={{ width: "40px" }}>
              <i class="fa fa-solid fa-font-awesome fa-lg"></i>
            </div>
            Banners
          </Link>
        </div>
        <div
          style={{
            backgroundColor: menu.includes("struktur-organisasi")
              ? "#fec439"
              : "",
          }}
          className="bg-tabmenu"
        >
          <Link className="menu font-lg d-flex" to="/admin/struktur-organisasi">
            <div style={{ width: "40px" }}>
              <i className="fa fa-sitemap fa-lg" aria-hidden="true"></i>
            </div>
            Struktur Organisasi
          </Link>
        </div>
        <div
          style={{
            backgroundColor: menu.includes("pengguna") ? "#fec439" : "",
          }}
          className="bg-tabmenu"
        >
          <Link className="menu font-lg d-flex" to="/admin/pengguna">
            <div style={{ width: "40px" }}>
              <i class="fa fa-users fa-lg" aria-hidden="true"></i>{" "}
            </div>
            Pengguna
          </Link>
        </div>
        <div
          style={{
            backgroundColor: menu.includes("list-data-warga") ? "#fec439" : "",
          }}
          className="bg-tabmenu"
        >
          <Link className="menu font-lg d-flex" to="/admin/list-data-warga">
            <div style={{ width: "40px" }}>
              <i class="fa fa-database fa-lg" aria-hidden="true"></i>
            </div>
            List Data Warga
          </Link>
        </div>
        <div className="bg-tabmenu">
          <Link className="menu font-lg d-flex" to="/">
            <div style={{ width: "40px" }}>
              <i class="fa fa-home fa-lg" aria-hidden="true"></i>
            </div>
            Kembali Ke Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
