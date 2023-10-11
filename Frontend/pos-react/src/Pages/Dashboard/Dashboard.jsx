import React, { useState, useEffect } from 'react';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './Dashboard.css';

function Dashboard(props) {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div style={{backgroundColor:'aquamarine'}}>
      <nav className="navbar navbar-expand-lg">
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

      {dashboardData && (
        <div>
          <div className="container text-center ">
            <div className="row">
              <div className="radius col-md-3 bg text-start p-4 ">
                <div className="fs-3 p-2 text-center myIcon bgIcon1 text-white">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="d-flex mt-3">
                  <h3>${dashboardData.totalSold}</h3>
                </div>
                <h6 className="nav-link">Total Sold</h6>
              </div>

              <div className="col-md-1"></div>

              <div className="radius col-md-3 bg1 text-start p-4 ">
                <div className="fs-3 bg-danger p-2 text-center myIcon text-white">
                  <i className="bi bi-chevron-double-down"></i>
                </div>
                <div className="d-flex mt-3">
                  <h3>${dashboardData.amountSold}</h3>
                </div>
                <h6 className="nav-link">Receipt Amount</h6>
              </div>

              <div className="col-md-1"></div>

              <div className="radius col-md-3 bg1 text-start p-4 ">
                <div className="fs-3 bg-black text-white p-2 text-center myIcon">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="d-flex mt-3">
                  <h3>{dashboardData.totalPeople} people</h3>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="container text-center raduis">
            <div className="row">
              <div className="col-md-7 bg-white text-start p-4 radius div-table">
                <div>
                  <h3>Staff's performance</h3>
                  <br></br>
                </div>
                <div id="table-wrapper">
                  <div id="table-scroll">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th scope="col"><span class="text1">Ranking</span></th>
                          <th scope="col"><span class="text1">Name</span></th>
                          <th scope="col"><span class="text1">Profit</span></th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {/* Staff Performance */}
                        <tr>
                            <td >
                              &emsp;
                            </td>
                            <td >
                              <i className="bi bi-person-fill"></i> Olio
                            </td>
                            <td>
                              ${dashboardData.amountSold}
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-1"></div>

              <div className="col-md-3  bg1 text-start px-4 radius">
                <div className="my-fs myIcon1 p-0">
                  <i className="bi bi-bar-chart-fill"></i>
                </div>
                <div className="d-flex mt-0">
                  <h2>${dashboardData.highestSale}</h2>
                </div>
                <h6 className="nav-link">Highest sales</h6>
              </div>
            </div>
          </div>

          <div className="container text-center my-5">
            <div className="row">
              <div className="col-md-11 bg1 text-start p-4 radius">
                <div>
                  <h3>Individual profit target</h3>
                </div>
                <img src={require("../../Images/chart.png")}  />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
