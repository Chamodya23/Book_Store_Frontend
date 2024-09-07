import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Author() {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAuthors();
  }, []);

  // Function to load all authors from the API
  const loadAuthors = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/author/getAllAuthors");
      console.log("API Response:", result.data); // Debugging: Log API response

      if (Array.isArray(result.data.content)) {
        setAuthors(result.data.content); // Handle nested response structure under "content"
      } else {
        setAuthors(result.data); // Set authors directly if it's an array
      }
    } catch (error) {
      console.error("Error loading authors:", error);
    }
  };

  // Function to delete an author
  const deleteAuthor = async (author_ID) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/author/deleteAuthor/${author_ID}`);
      console.log(response.data); // Log the deletion response

      if (response.data === "successfully deleted") {  // Check if the status is 202 (Accepted) or success
        loadAuthors(); // Reload authors list after successful deletion
      } else {
        console.error("Error deleting author:", response.data);
      }
    } catch (error) {
      console.error("Error deleting author:", error); // Catch deletion errors
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the authors based on the search term (case insensitive)
  const filteredAuthors = (Array.isArray(authors) ? authors : []).filter((author) =>
    author.author_Name.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search by Author Name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link className="btn btn-primary mx-5" to="/addauthor">
          Add New Author
        </Link>
      </div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Author ID</th>
            <th scope="col">Author Name</th>
            <th scope="col">Biography</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map((author) => (
              <tr key={author.author_ID}>
                <th scope="row">{author.author_ID}</th>
                <td>{author.author_Name}</td>
                <td>{author.biography}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewauthor/${author.author_ID}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editauthor${author.author_ID}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteAuthor(author.author_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No authors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
