import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCustomer() {
  let navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerName: "",
    customerAddress: "",
    customerMNumber: "",
    customerEmail: "",
  });

  const { customerName, customerAddress, customerMNumber, customerEmail } = customer;

  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!customerName || !customerAddress || !customerMNumber || !customerEmail) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      alert('Please enter a valid email.');
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/customer/save", customer, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      if (error.response && error.response.data) {
        alert(`Failed to add customer: ${error.response.data.message || error.message}`);
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add a customer</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer name"
                name="customerName"
                value={customerName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer address"
                name="customerAddress"
                value={customerAddress}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerMNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer mobile number"
                name="customerMNumber"
                value={customerMNumber}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer email"
                name="customerEmail"
                value={customerEmail}
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
