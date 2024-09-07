import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewAuthor() {
  const [author, setAuthor] = useState({
    author_Name: "",
    biography: "",

  });

  const { author_ID } = useParams(); // Extract author_ID from URL parameters
  console.log("Category Id is here", author_ID);

 useEffect(() => {   // Reload author data when author_ID changes

  const loadAuthor = async () => {
    try {
      // Use the new endpoint format with query parameter 'id'
      const result = await axios.get(`http://localhost:8080/api/v1/author/searchAuthor`, {
        params: { id: author_ID }
      });
      setAuthor(result.data); // Update the state with the received data
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };

    loadAuthor();
  }, [author_ID,])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Author Details</h2>

          <div className="card">
            <div className="card-header">
              Details of author id: {author_ID}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Author Name: </b>
                {author.author_Name}
              </li>
              <li className="list-group-item">
                <b>Biography: </b>
                {author.biography}
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
