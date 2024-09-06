import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  let navigate = useNavigate();
  const { bookId } = useParams(); // Ensure bookId is passed correctly from the route

  const [book, setBook] = useState({
    title: "",
    isbn: "",
    price: "",
    publishedDate: "",
  });

  const { title, isbn, price, publishedDate } = book;

  // Handles input changes
  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Loads book data when the component is mounted
  useEffect(() => {
    loadBook();
  }, [bookId]); // Depend on bookId, make sure it’s available

  // Fetch book details
  const loadBook = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/book/searchBook/${bookId}`);
      console.log("API Response:", result.data); // Log the response data
      setBook(result.data); // Assuming the response contains the book object
    } catch (error) {
      console.error("Error loading book data:", error);
    }
  };
  

  // Submit the form and update the book details
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/book/updateBook/${bookId}`, book);
      navigate("/"); // Redirect to homepage or appropriate route after updating
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Book</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ISBN" className="form-label">ISBN</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book ISBN"
                name="isbn"
                value={isbn}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter book price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="PublishedDate" className="form-label">Published Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter published date"
                name="publishedDate"
                value={publishedDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
