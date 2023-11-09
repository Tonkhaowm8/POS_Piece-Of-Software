import React, { useState, useEffect } from 'react';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './Dashboard.css';

function Dashboard(props) {
  const [dashboardData, setDashboardData] = useState({
    totalSold: 0,
    amountSold: 0,
    totalPeople: 0,
    highestSale: 0,
    eachMember: [],
  });

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

  // Define data for the chart
  const chartData = {
    labels: ['Total Sold'],
    datasets: [
      {
        label: 'Highest Sale',
        data: [dashboardData ? dashboardData.highestSale : 0], // Use dashboardData to access the value
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for labels
        labels: ['Total Sold'],
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div>
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


      <div style={{ marginRight: '60px' }}>
        <div className="container text-center">
          <div className="row">
            <h2 className='overwiev'>Tun Sales</h2>
            <div className="radius col-md-3 text-start p-4">
              <div className="fs-3 p-2 text-center myIcon bgIcon1 text-white">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="d-flex mt-3">
                <h4>${dashboardData.totalSold}</h4>
              </div>
              <h6 className="nav-link">Total Sales</h6>
            </div>

            <div className="col-md-1"></div>

            <div className="radius col-md-3 text-start p-4">
              <div className="fs-3 bg-danger p-2 text-center myIcon text-white">
                <i className="bi bi-chevron-double-down"></i>
              </div>
              <div className="d-flex mt-3">
                <h4>{dashboardData.amountSold}</h4>
              </div>
              <h6 className="nav-link">Item Amount</h6>
            </div>

            <div className="col-md-1"></div>

            <div className="radius col-md-3 text-start p-4">
              <div className="fs-3 bg-black text-white p-2 text-center myIcon">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="d-flex mt-3">
                <h4>{dashboardData.totalPeople} people</h4>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="container text-center raduis">
          <div className="row">
            <div className="col-md-7 bg-white text-start p-4 radius">
              <div>
                <h3>Staff Performance</h3>
                <br></br>
              </div>
              <div id="table-wrapper">
                <div id="table-scroll">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"><span class="text1">Ranking</span></th>
                        <th scope="col"><span class="text1">Name</span></th>
                        <th scope="col"><span class="text1">Profit</span></th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {Array.isArray(dashboardData.Ppl) ? (
                        dashboardData.Ppl.map((userName, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <i className="bi bi-person-fill"></i> {userName}
                            </td>
                            <td>${dashboardData.totalSold}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-sm-1"></div>

            <div className="col-md-3  text-start px-4 radius" /* "col-md-3 bg1 text-start px-4 radius" */> 
              <div className="fs-2 myIcon1 p-0">
                <i className="bi bi-bar-chart-fill"></i>
              </div>
              <div className="d-flex mt-0">
                <h2>${dashboardData.highestSale}</h2>
              </div>
              <h6 className="nav-link">Highest sales</h6>
            </div>
          </div>
        </div>

                        
        <div className="container text-center my-4">
          <div className="row">
            <div className="col-md-11 bg1 text-start p-4 radius">
              <div>
                <h3>Sales Overview</h3>
              </div>
              {/* <Bar data={chartData} options={chartOptions} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
