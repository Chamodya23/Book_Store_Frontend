import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCategory() {
  let navigate = useNavigate();

  const [category, setCategory] = useState({
    categoryName: "",
  });

  const { categoryName } = category;

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!categoryName ) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/category/saveCategory", category, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      if (error.response && error.response.data) {
        alert(`Failed to add category: ${error.response.data.message || error.message}`);
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add a category</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                name="categoryName"
                value={categoryName}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/category">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
