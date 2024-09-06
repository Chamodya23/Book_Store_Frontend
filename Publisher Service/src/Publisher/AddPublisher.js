import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddPublisher() {
  let navigate = useNavigate();

  const [publisher, setPublisher] = useState({
    publisher_Name: "",
    publisher_Address: "",
  });

  const { publisher_Name, publisher_Address } = publisher;

  const onInputChange = (e) => {
    setPublisher({ ...publisher, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!publisher_Name || !publisher_Address) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      console.log(publisher);
      const response = await axios.post("http://localhost:8080/api/v1/publisher/savePublisher", publisher, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Response:', response.data);
      navigate("/");
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      if (error.response && error.response.data) {
        alert(`Failed to add publisher: ${error.response.data.message || error.message}`);
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add a publisher</h2>

          <form onSubmit={onSubmit}>

            <div className="mb-3">
              <label htmlFor="publisher_Name" className="form-label">
                Publisher Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter publisher Name"
                name="publisher_Name"
                value={publisher_Name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publisher_Address" className="form-label">
                Publisher Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter publisher Address"
                name="publisher_Address"
                value={publisher_Address}
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