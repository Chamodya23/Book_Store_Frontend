import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/order/getALLOrders");
      console.log("API Response:", result.data); // Log the response data
      if (result.data && Array.isArray(result.data)) {
        setOrders(result.data); // Corrected: Set Orders directly if the data is an array
      } else if (result.data && Array.isArray(result.data.content)) {
        setOrders(result.data.content); // Corrected: If it's nested under content
      } else {
        console.error("Unexpected response format:", result.data);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };
  
  const deleteOrder = async (OrderId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/order/Deleteorder/${OrderId}`);
      if (response.status === 200) {
        alert("order deleted successfully!");
        loadOrders(); // Reload orders after deletion
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order!");
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Ensure order is an array before filtering
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter((order) =>
    order.orderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center py-4">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            className="form-control"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link className="btn btn-primary mx-5" to="/addorder">
          Add New Order
        </Link>
      </div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Order Name</th>
            <th scope="col">TotalAmount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.orderID}>
                <th scope="row">{order.OrderId}</th>
                <td>{order.orderName}</td>
                <td>{order.TotalAmount}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/vieworder/${order.OrderId}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editorder/${order.OrderId}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteOrder(order.OrderId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
