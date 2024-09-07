import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddAuthor() {
  let navigate = useNavigate();

  const [author, setAuthor] = useState({
    author_Name: "",
    biography: "",
  });

  const { author_Name, biography } = author;

  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!author_Name || !biography ) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/author/saveAuthor", author, {
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
          <h2 className="text-center m-4">Add an Author</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="author_Name" className="form-label">
                Author Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter author name"
                name="author_Name"
                value={author_Name}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="biography" className="form-label">
                Biography
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Biography"
                name="biography"
                value={biography}
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
