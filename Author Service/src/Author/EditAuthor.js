import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAuthor() {
  let navigate = useNavigate();
  const { author_ID } = useParams(); 

  const [author, setAuthor] = useState({
    author_Name: "",
    biography: "",
  });

  const { author_Name, biography } = author;

  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  // Wrap loadAuthor in useCallback to make it stable across renders
  const loadAuthor = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/author/searchAuthor`, {
        params: { id: author_ID }
      });
      setAuthor(result.data); // Update state with the fetched author data
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  }, [author_ID]); // Only recreate when author_ID changes

  useEffect(() => {
    loadAuthor();
  }, [loadAuthor]); // Now loadAuthor is included as a dependency

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/author/updateAuthor/${author_ID}`, author, {
        params: { id: author_ID },
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Author</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="author_Name" className="form-label">
                Author Name
              </label>
              <input
                type={"text"}
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
                type={"text"}
                className="form-control"
                placeholder="Enter biography"
                name="biography"
                value={biography}
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
