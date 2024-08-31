import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import Chart from 'chart.js/auto';
import "./Homepage.css";
import 'leaflet/dist/leaflet.css';
import DateTimeDisplay from "./DateTimeDisplay";

function Homepage() {
  
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance;
  
    const createChart = () => {
      const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
      const data = {
        labels: labels,
        datasets: [{
          label: 'Water Level (meters)',
          data: [12.5, 13.2, 13.8, 14.5, 15.0, 15.5, 16.0],
          borderColor: 'blue',
          fill: false,
          tension: 0.1
        }]
      };
  
      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Water Level of Glacial Lake Over Time',
              color: 'white'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Days',
                color: 'white'
              },
              ticks: {
                color: 'white'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Water Level (meters)',
                color: 'white'
              },
              ticks: {
                color: 'white'
              },
              beginAtZero: false
            }
          },
          elements: {
            point: {
              radius: 5,
              backgroundColor: 'white'
            }
          }
        }
      };
  
      chartInstance = new Chart(ctx, config);
    };
  
    // Destroy the previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    createChart();
  
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);
  

  return (
    <div>
      <div className="overall-dash">
        <div className="dash-left">
          <h5>Dashboard</h5><br/>
          <p className="para">Line chart :</p><br/>
          <div className="li"><canvas ref={chartRef} width="600" height="400" style={{ backgroundColor: 'black' }}></canvas></div>
          
          <div className="cirlc">
            <svg width="200" height="200" style={{ marginLeft: "10px" }}>
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#ddd"
                strokeWidth="20"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#4caf50"
                strokeWidth="20"
                fill="none"
                strokeDasharray="565.48"
                strokeDashoffset="113.1"
                transform="rotate(-18 100 100)"
              />
              <text x="100" y="100" className="circle-text">
                70%
              </text>
            </svg>
            <br />
            <br />
            <p className="para">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Risk
              Score
            </p>
          </div>
        </div>
        <div className="dash-right">
          <div className="vul">
            <h3 className="hh">Vulnerability Status :</h3>
            <p className="hhh">Moderate</p>
          </div>
          <div className="vul">
            <h3 className="hh">ML Prediction:</h3>
            <p className="hhh">Upper Indus lake might Outburst</p>
          </div>
          <hr />
          <br />
          <div className="map">
            <MapContainer className="map-display" center={[51.505, -0.09]} zoom={13}>
              <TileLayer
                url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              />
            </MapContainer>
          </div>
          <div className="map-text">
            <div>
              <p>Recommended Action: </p>
              <p>Move to higher ground</p>
            </div>
            <div className="date">
              <DateTimeDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
