import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/publisher/getAllPublishers");
        setPublishers(response.data);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };
    fetchPublishers();
  }, []); // Empty dependency array means this effect runs once on mount
  


  const deletePublisher = async (publisher_Id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/publisher/deletePublisher`, {
        params: { id: publisher_Id }
      });
      console.log(response.data); // Log the response message
      if (response.data === "successfully deleted") {
        loadPublishers(); // Reload publisher after successful deletion
      } else {
        console.error("Unexpected delete response:", response.data);
      }
    } catch (error) {
      console.error("Error deleting publisher:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPublishers = (Array.isArray(publishers) ? publishers : []).filter((publisher) =>
    publisher.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search by Title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link className="btn btn-primary mx-5" to="/addpublisher">
          Add New publisher
        </Link>
      </div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col"> publisher_Id </th>
            <th scope="col">publisher_Name</th>
            <th scope="col">publisher_Address</th>
            
          </tr>
        </thead>
        <tbody>
  {filteredPublishers.map((publisher, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{publisher.publisher_Name}</td>
      <td>{publisher.publisher_Address}</td>
      <td>
        <Link className="btn btn-primary mx-2" to={`/viewpublisher/${publisher.publisher_Id}`}>
          View
        </Link>
        <Link className="btn btn-outline-primary mx-2" to={`/editpublisher/${publisher.publisher_Id}`}>
          Edit
        </Link>
        <button
          className="btn btn-danger mx-2"
          onClick={() => deletePublisher(publisher.publisher_Id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}
