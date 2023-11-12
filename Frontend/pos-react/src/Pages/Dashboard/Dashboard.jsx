import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './Dashboard.css';

function Dashboard(props) {
  const [dashboardData, setDashboardData] = useState({
    totalSold: 0,
    amountSold: 0,
    totalPeople: 0,
    highestSale: 0,
    Ppl: [0],
  });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
          console.log(data)
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
  
  // Use a ref to get the canvas element for the chart
  const chartRef = useRef(null);

  useEffect(() => {
    // Create the line chart when the component mounts or when the data changes
    if (dashboardData.highestSale && dashboardData.amountSold) {
      const ctx = chartRef.current.getContext('2d');

      // Clear any existing chart
      if (window.myLineChart) {
        window.myLineChart.destroy();
      }

      // create arrays for x and y values
      const xValues = [];
      const yValues = [dashboardData.highestSale, dashboardData.highestSale];
      console.log("yVALUES:",yValues)

      for (let i = 0; i < dashboardData.amountSold; i++) {
        xValues.push(`Order ${i + 1}`);
      }
      console.log("xVALUES:",xValues)

      window.myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: xValues,
          datasets: [
            {
              label: 'Sales vs Amount Sold',
              data: yValues,
              borderColor: 'rgb(221, 157, 6)',
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(247, 182, 31, 0.99)',
            },
          ],
        },
        options: {
          // plugins: {
          //   title: {
          //       display: true,
          //       text: 'Custom Chart Title'
          //   }
          // },
          scales: {
            x: {
              grid: {
                drawOnChartArea: false
              },
              title: {
                display: true,
                text: 'Order',
              },
              ticks: {
                fontSize: 24, // Adjust the font size for x-axis labels
              },
            },
            y: {
              title: {
                display: true,
                text: 'Total Sales',
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [dashboardData]);

  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
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
              <h6 className="nav-link">Order Amount</h6>
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
                <br />
              </div>
              <div id="table-wrapper">
                <div id="table-scroll">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className="text1">Ranking</span>
                        </th>
                        <th scope="col">
                          <span className="text1">Name</span>
                        </th>
                        <th scope="col">
                          <span className="text1">No. Sales</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {Array.isArray(dashboardData.Ppl) ? (
                        // Sort users based on the number of sales
                        dashboardData.Ppl
                          .slice() // Create a copy to avoid modifying the original array
                          .sort((a, b) => b.noOfSales - a.noOfSales) // Sort in descending order
                          .map((user, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <i className="bi bi-person-fill"></i> {user.username}
                              </td>
                              <td>{user.noOfSales}</td>
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

            <div className="col-md-3  text-start px-4 radius">
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

        <br />
        <br />
        
        <div className="container text-center">
          <div className="row">
            <div className="col-md-9 bg-white p-4 radius">
              <canvas ref={chartRef} />
            </div>
          </div>
        </div>

        <br />
        <br />

      </div>
    </div>
  );
}

export default Dashboard;