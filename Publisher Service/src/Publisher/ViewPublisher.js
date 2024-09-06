import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ViewPublisher() {
  let navigate = useNavigate();
  const { id } = useParams(); // Assuming the publisher ID is passed via the URL

  const [publisher, setPublisher] = useState({
    publisher_Name: "",
    publisher_Address: "",
  });

  useEffect(() => {
    loadPublisher();
  }, []);

  const loadPublisher = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/publisher/searchPublisher/${id}`);
      setPublisher(result.data);
    } catch (error) {
      console.error("Error fetching publisher details:", error);
      alert("Error fetching publisher details.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">publisher Details</h2>

          <div className="card">
            <div className="card-header">
              Details of publisher id : {id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>publisher_Name: </b>
                {publisher.publisher_Name}
              </li>
              <li className="list-group-item">
                <b>publisher_Address: </b>
                {publisher.publisher_Address}
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
