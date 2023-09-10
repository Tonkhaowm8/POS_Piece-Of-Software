import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "../components/SideNav";
import RightSidebar from './CalculatePrice';
import './Stock.css';


function Stock(props) {
    console.log("FCK");

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/items') // Specify the complete URL
            .then((response) => {
                console.log(response.data);
                console.log(setItems(response.data));
                setItems(response.data); // Update state with the JSON data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return(
        <div className="page"  class="stock-background row" >
            <div class="col-sm uni1">
                <div class="margin-topnav">
                    <h3>All products</h3>
                </div>
                {/* <div>
                    {Array.isArray(items)
                        ? items.map(element => {
                            return <h2>{element}</h2>;
                        })
                    : null}
                </div> */}
                <h2>Stock page</h2>
                {/* <ul>
                {items.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul> */}
                
            </div>
            <div class="col-sm uni2">
                <div class="margin-topnav">
                    <h3>Carts</h3>
                </div>
            </div>
            
        </div>
    );
}
export default Stock;