import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPublisher() {
  let navigate = useNavigate();

  const { Publisher_Id } = useParams();

  const [publisher, setPublisher] = useState({
    publisher_Name: "",
    publisher_Address: "",
  
  });

  const {publisher_Name, publisher_Address} = publisher;

  const onInputChange = (e) => {
    setPublisher({ ...publisher, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadPublisher();
  }, [Publisher_Id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the new endpoint with query parameter for updating customer
      await axios.put(`http://localhost:8080/api/v1/publisher/updatePublisher`, publisher ,{
        params: { id: Publisher_Id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating publisher:", error);
    }
  };

  const loadPublisher = async () => {
    try {
      // Use the new endpoint with query parameter for fetching customer details
      const result = await axios.get(`http://localhost:8080/api/v1/publisher/searchPublisher`,{
        params: { id: Publisher_Id }
      });
      setPublisher(result.data); // Update state with the fetched customer data
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Publisher</h2>

          <form onSubmit={onSubmit}>
            
            <div className="mb-3">
              <label htmlFor="Publisher_Name" className="form-label">
                publisher_Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter publisher Name"
                name="publisher_Name"
                value={publisher_Name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Publisher_Address" className="form-label">
                publisher_Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter  publisher Address"
                name="publisher_Address"
                value={publisher_Address}
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
