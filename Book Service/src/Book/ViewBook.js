import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewBook() {
  const [book, setBook] = useState({
    title: "",
  });
  //const [loading, setLoading] = useState(true); // Added loading state
 // const [error, setError] = useState(null); // Added error state

  const { id } = useParams();
  console.log("Book Id is here", id);

  useEffect(() => {
    loadBook();
  }, [id]);

  
  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/book/searchBook/${id}`);
    setBook(result.data); 
    console.log(book);
};


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Book Details</h2>

          <div className="card">
            <div className="card-header">
              Details of book id : {id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Title: </b>
                {book.title}
              </li>
              <li className="list-group-item">
                <b>ISBN: </b>
                {book.isbn}
              </li>
              <li className="list-group-item">
                <b>Price: </b>
                {book.price}
              </li>
              <li className="list-group-item">
                <b>Published Date: </b>
                {book.publishedDate}
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
