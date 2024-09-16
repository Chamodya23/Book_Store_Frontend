import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ViewCustomer() {

  const location = useLocation();
  const {customers} = location.state || {};

  const [customer, setCustomer] = useState({
    customerID: "",
    customerName: "",
    customerAddress: "",
    customerMNumber: "",
    customerEmail: "",
  });

  const { CustomerID } = useParams();

  useEffect(() => {
    loadCustomer();
  }, [CustomerID]);

  const loadCustomer = async () => {
    try {
      // Fetch the customer data from the API
      const result = await axios.get(`http://localhost:8080/api/v1/customer/search?id=${CustomerID}`);
      
      // Check if the result is an array and extract the customer data accordingly
      if (result.data && Array.isArray(result.data)) {
        setCustomer(result.data[0]);
        console.log(result.data) // Use the first element if the response is an array
      } else {
        setCustomer(result.data); // Use the object directly if it's not an array
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Customer Details</h2>

          <div className="card">
            <div className="card-header">
              Details of customer id : {customers.customerID}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name: </b>
                {customers.customerName}
              </li>
              <li className="list-group-item">
                <b>Address: </b>
                {customers.customerAddress}
              </li>
              <li className="list-group-item">
                <b>MobileNumber: </b>
                {customers.customerMNumber}
              </li>
              <li className="list-group-item">
                <b>Email: </b>
                {customers.customerEmail}
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
