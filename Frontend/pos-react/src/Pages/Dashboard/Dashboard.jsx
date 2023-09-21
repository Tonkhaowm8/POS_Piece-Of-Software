import React from 'react';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './Dashboard.css'

function Dashboard(props) {
  return (
    <div>
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav"></div>
      </div>
    </nav>

    <br />
    <br />

    <div className="container text-center">
      <div className="row">
        <div className="col-md-3 bg text-start p-4 raduis">
          <div className="fs-3 p-2 text-center myIcon bgIcon1 text-white">
            <i className="bi bi-currency-dollar"></i>
          </div>
          <div className="d-flex mt-3">
            <h3>$215,970</h3>
            <h6 className="pt-2 ps-1 colorIcon1">+4.5%</h6>
          </div>
          <h6 className="nav-link">Profit/Loss</h6>
        </div>

        <div className="col-md-1"></div>

        <div className="col-md-3 bg1 text-start p-4 raduis">
          <div className="fs-3 bg-danger p-2 text-center myIcon text-white">
            <i className="bi bi-chevron-double-down"></i>
          </div>
          <div className="d-flex mt-3">
            <h3>-$2,970</h3>
            <h6 className="pt-2 ps-1 text-danger">-3.1%</h6>
          </div>
          <h6 className="nav-link">Total sold</h6>
        </div>

        <div className="col-md-1"></div>

        <div className="col-md-3 bg1 text-start p-4 raduis">
          <div className="fs-3 bg-black text-white p-2 text-center myIcon">
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="d-flex mt-3">
            <h3>3,100 peoples</h3>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />

    <div className="container text-center">
      <div className="row">
        <div className="col-md-7 bg-white text-start p-4 raduis div-table">
          <div>
            <h3>Staff's performance</h3>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Ranking</th>
                <th scope="col">Name</th>
                <th scope="col">Profit</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>&emsp;1</td>
                <td>
                  <i className="bi bi-person-fill"></i> Otto
                </td>
                <td>$45665</td>
              </tr>
              <tr>
                <td>&emsp;2</td>
                <td>
                  <i className="bi bi-person-fill"></i> Thornton
                </td>
                <td>$6543</td>
              </tr>
              <tr>
                <td>&emsp;3</td>
                <td>
                  <i className="bi bi-person-fill"></i> Larry
                </td>
                <td>$123457</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3  bg1 text-start px-4 raduis">
          <div className="my-fs myIcon1  p-0">
            <i className="bi bi-bar-chart-fill"></i>
          </div>
          <div className="d-flex mt-0">
            <h2>$12,643</h2>
            <h6 className="pt-2 ps-1 colorIcon1">+10.7%</h6>
          </div>
          <h6 className="nav-link">Highest scales</h6>
        </div>
      </div>
    </div>

    <div className="container text-center my-5">
      <div className="row">
        <div className="col-md-11 bg1  text-start p-4 raduis">
          <div>
            <h3>Individual profit target</h3>
          </div>
          <img src="chart.png" className="pic" alt="" />
        </div>
      </div>
    </div>
  </div>
    );
}
export default Dashboard;
