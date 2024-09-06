import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Book() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



 
  const loadBooks = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v1/book/getAllBooks");
      console.log("API Response:", result.data); // Log the response data
      if (result.data && Array.isArray(result.data)) {
        setBooks(result.data); // Corrected: Set customers directly if the data is an array
      } else if (result.data && Array.isArray(result.data.content)) {
        setBooks(result.data.content); // Corrected: If it's nested under content
      } else {
        console.error("Unexpected response format:", result.data);
      }
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);
 
  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/book/deleteBook/${bookId}`);
      console.log(response.data); // Log the response message
      if (response.data === "successfully deleted") {
        loadBooks(); // Reload books after successful deletion
      } else {
        console.error("Unexpected delete response:", response.data);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Link className="btn btn-primary mx-5" to="/addbook">
          Add New Book
        </Link>
      </div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">Book ID</th>
            <th scope="col">Title</th>
            <th scope="col">ISBN</th>
            <th scope="col">Price</th>
            <th scope="col">Published Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>{book.price}</td>
              <td>{book.publishedDate}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewbook/${book.bookId}`}>
                  View
                </Link>
                <Link className="btn btn-outline-primary mx-2" to={`/editbook/${book.bookId}`}>
                  Edit
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => deleteBook(book.bookId)}
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
