import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./table.css";

const SeeInventory = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log("hi");
    axios
      .get("http://localhost:5001/items/see")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>User Data Table</h2>
      {userData.map((item) => (
        <div key={item._id}>
          <h3>User: {item.userID}</h3>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Quantity</th>
                <th>Issue Date</th>
              </tr>
            </thead>
            <tbody>
              <tr key={item._id}>
                <td>{item.item_id}</td>
                <td>{item.quantity}</td>
                <td>{item.issueDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div>
        <p className="text-gray-600 text-sm">
          Access Inventory?{" "}
          <Link className="text-blue-500 underline" to="/dashboard">
            dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SeeInventory;
