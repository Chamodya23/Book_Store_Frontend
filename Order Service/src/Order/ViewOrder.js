import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewOrder() {
  const [order, setOrder] = useState({
    orderName: "",
    totalAmount: "",
    customerID: "",
  });

  const { id } = useParams(); // Extract 'id' from the URL parameters
  console.log("Order ID is:", id);

  useEffect(() => {
    loadOrder();
  }, [id]); // Reload order data when 'id' changes

  const loadOrder = async () => {
    try {
      // Fetch order details using the 'id' from the URL
      const result = await axios.get(`http://localhost:8080/api/v1/order/SearchOrder/${id}`);
      setOrder(result.data.content); // Assuming the order is in the 'content' field
      console.log("Fetched order data:", result.data.content);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Order Details</h2>

          <div className="card">
            <div className="card-header">
              Details of order id: {id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Order Name: </b>
                {order.orderName || "N/A"}
              </li>
              <li className="list-group-item">
                <b>Total Amount: </b>
                {order.totalAmount || "N/A"}
              </li>
              <li className="list-group-item">
                <b>Customer ID: </b>
                {order.customerID || "N/A"}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
