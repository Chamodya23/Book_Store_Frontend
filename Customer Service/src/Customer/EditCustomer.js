import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCustomer() {
  let navigate = useNavigate();
  const { CustomerID } = useParams(); // Extract CustomerID from URL parameters

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

  useEffect(() => {
    loadCustomer();
  }, [CustomerID]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the new endpoint with query parameter for updating customer
      await axios.put(`http://localhost:8080/api/v1/customer/update`, customer, {
        params: { id: CustomerID },
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const loadCustomer = async () => {
    try {
      // Use the new endpoint with query parameter for fetching customer details
      const result = await axios.get(`http://localhost:8080/api/v1/customer/search`, {
        params: { id: CustomerID }
      });
      setCustomer(result.data); // Update state with the fetched customer data
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Customer</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter customer name"
                name="customerName"
                value={customerName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter customer address"
                name="customerAddress"
                value={customerAddress}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="MobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter customer mobile number"
                name="customerMNumber"
                value={customerMNumber}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter email"
                name="customerEmail"
                value={customerEmail}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
