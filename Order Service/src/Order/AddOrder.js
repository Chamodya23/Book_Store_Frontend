import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddOrder() {
  let navigate = useNavigate();

  const [order, setOrder] = useState({
    OrderName: "",
    TotalAmount: "",
  });

  const { OrderName, TotalAmount } = order;

  const onInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!OrderName || !TotalAmount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/order/saveOrder", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/"); // Navigate to home after successful order submission
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      if (error.response && error.response.data) {
        alert(`Failed to add order: ${error.response.data.message || error.message}`);
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add a New Order</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="OrderName" className="form-label">
                Order Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter order name"
                name="OrderName"
                value={OrderName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TotalAmount" className="form-label">
                Total Amount
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Total Amount"
                name="TotalAmount"
                value={TotalAmount}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
