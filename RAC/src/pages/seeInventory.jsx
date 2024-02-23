import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const groupByUserId = () => {
    const groupedData = {};
    userData.forEach((item) => {
      const userId = item.userID;
      if (!groupedData[userId]) {
        groupedData[userId] = [];
      }
      groupedData[userId].push(item);
    });
    return groupedData;
  };

  return (
    <div>
      <h1
        style={{
          color: "back",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "30px",
          textDecoration: "underline",
        }}
      >
        User Data Table
      </h1>
      {Object.entries(groupByUserId()).map(([userId, userItems]) => (
        <div key={userId}>
          <h3
            style={{ color: "#555", textAlign: "center", fontWeight: "bold" }}
          >
            User ID: {userId}
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Item ID
                </th>
                <th
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Issue Date
                </th>
              </tr>
            </thead>
            <tbody>
              {userItems.map((item) => (
                <tr key={item._id}>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item.item_id}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item.issueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Access Inventory?{" "}
          <Link
            style={{ color: "#3498db", textDecoration: "underline" }}
            to="/dashboard"
          >
            dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SeeInventory;
