import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate=useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/customer/view");
      console.log("API Response:", result.data); // Log the response data
      if (result.data && Array.isArray(result.data)) {
        setCustomers(result.data); // Corrected: Set customers directly if the data is an array
      } else if (result.data && Array.isArray(result.data.content)) {
        setCustomers(result.data.content); // Corrected: If it's nested under content
      } else {
        console.error("Unexpected response format:", result.data);
      }
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };
  

  const deleteCustomer = async (customerID) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/customer/delete`, {
        params: { id: customerID }
      });
      console.log(response.data); // Log the response message
      if (response.data === "successfully deleted") {
        loadCustomers(); // Reload customers after successful deletion
      } else {
        console.error("Unexpected delete response:", response.data);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewCustomer=(customers)=>{
    console.log(customers)
    Navigate('/viewcustomer',{state:{customers}});
  }

  // Ensure customers is an array before filtering
  const filteredCustomers = (Array.isArray(customers) ? customers : []).filter((customer) =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Link className="btn btn-primary mx-5" to="/addcustomer">
          Add New Customer
        </Link>
      </div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customers) => (
              <tr key={customers.customerID}>
                <th scope="row">{customers.customerID}</th>
                <td>{customers.customerName}</td>
                <td>{customers.customerAddress}</td>
                <td>{customers.customerMNumber}</td>
                <td>{customers.customerEmail}</td>
                <td>
                  {/* <Link className="btn btn-primary mx-2" to={`/viewcustomer/${customer.customerID}`}>
                    View
                  </Link> */}
                  <button className="btn btn-primary mx-2" onClick={()=> handleViewCustomer(customers)}>View</button>
                  <Link className="btn btn-outline-primary mx-2" to={`/editcustomer/${customers.customerID}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCustomer(customers.customerID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
